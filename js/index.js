var remote_url = "http://www.golfpipelinedemo.com";
//var remote_url = "http://localhost:3000";

function renderTemplate(name, json)
{
  tmpl = "";
  var url = 'js/templates/' + name + '.html';
  $.ajax({
    url: url,
    method: 'GET',
    async: false,
    dataType: 'html',
    success: function(data) {
      tmpl = _.template(data, json);
    }
  });
  return tmpl;
}

var do_validate = true;
var token       = false;
var map         = false;
var selections  = [
  "skill_level",
  "gender",
  "martial_status",
  "year_started",
  "gamble",
  "driver_model",
  "fairway_woods_model",
  "hybrids_model",
  "irons_model",
  "wedges_model",
  "putter_model",
  "golf_ball_model",
  "shoe_brand"
  ];

document.addEventListener("deviceready", onDeviceReady, false);
window.localStorage.setItem("remote_url", remote_url);

function onDeviceReady()
{

  $("#login_form").submit( function(e) { login(); return false; });
  $("#update-profile_form").submit( function(e) { updateProfile(); return false; });
  $("#update-profile_form").validate();
  $("#register_form").submit( function(e) { register(); return false; });
  $("#register_form").validate();
  $("#search-times_form").submit( function(e) { searchTimes(); return false; });
  $("#search-times_form").validate();
  $("#search-courses_form").submit( function(e) { searchCourses(); return false; });
  $("#search-courses_form").validate();
  $(document).submit( function(e) { bookTime(); return false; });
  $("#payment_form").validate();

  $('input[type=submit]').buttonMarkup({ corners: false });

  $(".mini_logo").click( function() {
    $(".nav_strip ul").css("left", "-35%");
  });

  $(document).on("click", ".tee_link", function()
  {
    tt_id       = $(this).attr("id").split("_")[2];
    c_id        = $(this).attr("id").split("_")[3];
    time_string = $(this).attr("id").split("_")[4];
    window.localStorage.setItem("book_time", time_string);
    window.localStorage.setItem("book_id", tt_id);
    r = connect("/courses/" + c_id + ".json", "get", data, true);
    course = new Course(r);
    new TimeView({ course: course });
    mapCoords(course.get("lat"), course.get("lon"));
  });

  $(document).on("click", ".course_link", function()
  {
    slug = $(this).attr("id").replace("course_link_", "");
    r = connect("/courses/" + slug + ".json", "get", data, true);
    course = new Course(r);
    new CourseView({ course: course });
    //$("#course_details").html("<h2>" + apiResponse.label + "</h2>Latitude: " + apiResponse.lat + "<br />Longitude: " + apiResponse.lon);
  });

  $(document).on("click", "#payment_builder", function()
  {
    new PaymentView({ user: currentUser, slot: slots[tt_id] });
  });

  $(".datepicker").pickadate();
  $(".timepicker").pickatime();
}

function searchTimes()
{
  data = { "mobile_time": {
    "location":     $("#search-times_location").val(),
    "distance":     $("#search-times_distance").val(),
    "date":         $("#search-times_date").val(),
    "time":         $("#search-times_time").val(),
    "golfer_count": $("#search-times_golfer-count").val()
  }};

  if (!$("#search-times_form").valid() && do_validate)
    return false;

  url = "/search_tee_times/results.json";
  apiResponse = connect(url, "get", data, true);
  if (apiResponse)
  {
    timeResults = new TimeResults(apiResponse);
    new TimeResultsView({ time_results: timeResults });
    $.mobile.changePage($('#page_result-times'));
  }
  else
    alert("There was an error.");
}

function bookTime()
{
  formattedTeeTime = new Date(slots[tt_id].tee_time);
  data = {
    "search_tee_time"  : {
      "first_name"     : $("#payment_first-name").val(),
      "last_name"      : $("#payment_last-name").val(),
      "email"          : $("#payment_email").val(),
      "phone_number"   : "123-456-7890",//$("#payment_phone").val(),
      "cc_number"      : "4111111111111111",//$("#payment_number").val(),
      "cc_exp_month"   : "06",//$("#payment_month").val(),
      "cc_exp_year"    : "2017",//$("#payment_year").val(),
      "user_id"        : currentUser.get("id"),
      "booking"        : "1",
      "golfer_count"   : "4",
      "tee_time"       : window.localStorage.getItem("book_time"),
      "play_course_id" : slots[tt_id].play_course_id,
      "save_address"   : "0",
      "line_1"         : "123 Main Street",
      "city"           : "Anytown",
      "state"          : "CO",
      "zip"            : "80211"
    }
  };

  url = "/search_tee_times/" + window.localStorage.getItem("book_id") + ".json";
  apiResponse = connect(url, "put", data, true);
  if (apiResponse)
  {
    if (apiResponse.errors == "Sorry, that tee time no longer exists.")
    {
      $.mobile.changePage($('#page_search-times'));
      $("#page_search-times .errors").html("Sorry, that tee time no longer exists.").show();
    }
    else
    {
      $("#page_upcoming-golf .alerts").html("Your time has been booked.").show();
      tee_times = new TeeTimes(connect("/tee_times.json", "get", data, true));
      new TeeTimesView({ tee_times: tee_times });
      $.mobile.changePage($('#page_upcoming-golf'));
    }
  }
}

function searchCourses()
{
  center = $("#search-courses_location").val();
  distance = $("#search-courses_distance").val();
  data = { "mobile_course": { "location" : center, "distance": distance } };
  url = "/courses/search.json";
  apiResponse = connect(url, "get", data, true);
  if (apiResponse)
  {
    courses = new Courses(apiResponse);
    new CoursesView({ courses: courses });
    $.mobile.changePage($('#page_result-courses'));
  }
  else
    alert("There was an error.");
}

function login()
{
  data = { user: {
    login: $("#login_username").val(),
    password: $("#login_password").val()
  }};

  if (!$("#login_form").valid() && do_validate)
    return false;

  url = "/users/sign_in.json"
  apiResponse = connect(url, "post", data, false);

  if (apiResponse)
  {
    currentUser = new User(apiResponse);
    window.localStorage.setItem("token", currentUser.attributes.authentication_token);
    new ProfileView({ user: currentUser });
    new ProfileEditorView({ user: currentUser });
    $.mobile.changePage($('#page_home'));
    thumbURL = window.localStorage.getItem("remote_url") + currentUser.get("image_thumb");
    imageURL = window.localStorage.getItem("remote_url") + currentUser.get("image_url");
    $("#big_picture_box").html('<img src="' + imageURL + '" />');
    $("#profile_button .ui-btn-inner").css("background-image", "url(" + thumbURL + ")");
    data = "";

    notifications = new Notifications(connect("/notifications.json", "get", data, true));
    $(".notification_count").html(notifications.length);
    if (notifications.length == 1)
      $(".notification_plural").hide();
    new NotificationsView({ notifications: notifications });

    activities = new Activities(connect("/profile/friend_activity.json", "get", data, true));
    $(".activity_count").html(activities.length);
    new ActivitiesView({ activities: activities });

    tee_times = new TeeTimes(connect("/tee_times.json", "get", data, true));
    new TeeTimesView({ tee_times: tee_times });
  }
  else
    $("#login_errors").html("Your username and/or password were incorrect.");
}

function updateProfile()
{
  data = {
    user: {
      first_name:      $("#profile_first_name").val(),
      last_name:       $("#profile_last_name").val(),
      profile_attributes: {
        favorite_golfer:     $("#profile_favorite-golfer").val(),
        favorite_event:      $("#profile_favorite-event").val(),
        tournaments_a_year:  $("#profile_tournaments-a-year").val(),
        skill_level:         $("#profile_skill-level").val(),
        gender:              $("#profile_gender").val(),
        marital_status:      $("#profile_marital-status").val(),
        year_started:        $("#profile_year-started").val(),
        gamble:              $("#profile_gamble").val(),
        driver_model:        $("#profile_driver-model").val(),
        fairway_woods_model: $("#profile_fairway-woods-model").val(),
        hybrids_model:       $("#profile_hybrids-model").val(),
        irons_model:         $("#profile_irons-model").val(),
        wedges_model:        $("#profile_wedges-model").val(),
        putter_model:        $("#profile_putter-model").val(),
        golf_ball_model:     $("#profile_golf-ball-model").val(),
        shoe_brand:          $("#profile_shoe-brand").val()
      }
    }
  };
  apiResponse = connect("/users.json", "put", data, true);
  if (apiResponse)
  {
    $.mobile.changePage($('#page_home'));
    currentUser.set({
      first_name:          $("#profile_first_name").val(),
      last_name:           $("#profile_last_name").val(),
      favorite_golfer:     $("#profile_favorite-golfer").val(),
      favorite_event:      $("#profile_favorite-event").val(),
      tournaments_a_year:  $("#profile_tournaments-a-year").val(),
      skill_level:         $("#profile_skill-level").val(),
      gender:              $("#profile_gender").val(),
      marital_status:      $("#profile_marital-status").val(),
      year_started:        $("#profile_year-started").val(),
      gamble:              $("#profile_gamble").val(),
      driver_model:        $("#profile_driver-model").val(),
      fairway_woods_model: $("#profile_fairway-woods-model").val(),
      hybrids_model:       $("#profile_hybrids-model").val(),
      irons_model:         $("#profile_irons-model").val(),
      wedges_model:        $("#profile_wedges-model").val(),
      putter_model:        $("#profile_putter-model").val(),
      golf_ball_model:     $("#profile_golf-ball-model").val(),
      shoe_brand:          $("#profile_shoe-brand").val()
    });
    new ProfileView({ user: currentUser });
    new ProfileEditorView({ user: currentUser });
  }
}

google.maps.event.addDomListener(window, 'load', setup); 

function setup() {
    // wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);
        
    function onDeviceReady() {
        // get device's geographical location and return it as a Position object (which is then passed to onSuccess)
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}

function mapCoords(lat,lon) { 
    var myLocation = new google.maps.LatLng(lat,lon);

    map  = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLocation,
    zoom: 15
    });
}

function onError(position) { 
}
