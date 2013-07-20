document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
var token = false;

function onDeviceReady()
{
  db.transaction(populateQuery, error);
  $("#login_form").submit( function(e) { login(); return false; });
  $("#login_form").validate();
  $("#update-profile_form").submit( function(e) { updateProfile(); return false; });
  $("#update-profile_form").validate();
  $("#register_form").submit( function(e) { register(); return false; });
  $("#register_form").validate();
  $("#search-times_form").submit( function(e) { searchTimes(); return false; });
  $("#search-times_form").validate();
  $(".header img").click( function(e) { goHome(); });

  $('input[type=submit]').buttonMarkup({ corners: false });
}

function searchTimes()
{ 
  db.transaction(searchTimesQuery, error);
}

function login()
{
  user = $("#login_username").val();
  pass = $("#login_password").val();
  url = "/users/sign_in.json"
  data = JSON.stringify({ user: { login: user, password: pass } });
  apiResponse = connect(url, "post", data);
  if (apiResponse)
  {
    $.mobile.changePage($('#page_home'));
    //alert(JSON.stringify(apiResponse));
    window.localStorage.setItem("token", apiResponse["authentication_token"]);
    window.localStorage.setItem("first_name", apiResponse["first_name"]);
    window.localStorage.setItem("last_name", apiResponse["last_name"]);
    window.localStorage.setItem("email", apiResponse["email"]);
    window.localStorage.setItem("password", apiResponse["password"]);
    window.localStorage.setItem("zip_code", apiResponse["zip_code"]);

    $(".h_first_name").html(window.localStorage.getItem("first_name"));
    $(".h_last_name").html(window.localStorage.getItem("last_name"));
    $(".v_first_name").val(window.localStorage.getItem("first_name"));
    $(".v_last_name").val(window.localStorage.getItem("last_name"));
  }
  else
    $("#login_errors").html("Your username and/or password were incorrect.");
}

function updateProfile()
{
  firstName = $("#profile_first_name").val();
  lastName = $("#profile_last_name").val();
  url = "/users.json?auth_token=" + window.localStorage.getItem("token");
  data = JSON.stringify({ user: {
    first_name: firstName,
    last_name: lastName,
  } });
  apiResponse = connect(url, "put", data);
  if (apiResponse)
  {
    $.mobile.changePage($('#page_home'));
    window.localStorage.setItem("first_name", firstName);
    window.localStorage.setItem("last_name", lastName);
    $(".h_first_name").html(window.localStorage.getItem("first_name"));
    $(".h_last_name").html(window.localStorage.getItem("last_name"));
    $(".v_first_name").val(window.localStorage.getItem("first_name"));
    $(".v_last_name").val(window.localStorage.getItem("last_name"));
  }
  else
    $("#edit-profile_errors").html("The requested change could not be made.");
}

function connect(url, type, data)
{
  var response = false;
  var api = $.ajax(
  {
    url: "http://www.golfpipelinedemo.com" + url,
    type: type,
    data: data,
    async: false,
    headers:
    {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    dataType: "json",
    success: function(feedback)
    {
      response = feedback;
      if (typeof feedback == "undefined")
        response = true;
    }
  }).fail( function(c) {
    if (c.status != "401")
      alert(c.status + ": There was an error connecting to the API.");
  });
  return response;
}

function register()
{
  db.transaction(registerQuery, error);
}

function loginQuery(tx)
{
  user = $("#login_username").val();
  pass = $("#login_password").val();
  query = "select * from users where username = '" + user + "' and password = '" + pass + "'";
  tx.executeSql(query, [], loginSuccess, error);
}

function searchTimesQuery(tx)
{
  course_name = $("#search-times_name").val();
  query = "select * from courses where name like '%" + course_name + "%'";
  tx.executeSql(query, [], searchTimesSuccess, error);
}

function registerQuery(tx)
{
  user  = $("#register_username").val();
  pass  = $("#register_password").val();
  query = "insert into users (username, password) values ('" + user + "', '" + pass + "')";
  alert(query);
  tx.executeSql(query);
}

function loginSuccess(tx, results)
{
  var len = results.rows.length;
  if (len == 0)
  {
    $("#login_errors").html("Your username and/or password were incorrect.");
    return false;
  }
  else
    $.mobile.changePage($('#page_home'));
}

function searchTimesSuccess(tx, results)
{
  var len = results.rows.length;
  if (len == 0)
  {
    $("#search-times_errors").html("No courses were found.");
    return false;
  }
  else
  {
    $("#results_courses").html("");
    for (var i=0; i<len; i++)
    {
      courseHTML = "<li>" + results.rows.item(i).name + "</li>";
      $("#results_courses").append(courseHTML);
    }
    $.mobile.changePage($('#page_result-times'));
  }
}

function goHome()
{
  $.mobile.changePage($('#page_login'));
}

function populateQuery(tx)
{
  tx.executeSql('drop table if exists users');
  tx.executeSql('create table if not exists users (id unique, username, password)');
  tx.executeSql('insert into users (id, username, password) values (1, "test", "1234")');
  tx.executeSql('insert into users (id, username, password) values (2, "test2", "4321")');

  tx.executeSql('drop table if exists courses');
  tx.executeSql('create table if not exists courses (id unique, name)');
  tx.executeSql('insert into courses (id, name) values (1, "St. Andrews")');
  tx.executeSql('insert into courses (id, name) values (2, "Pebble Beach")');
}

function populateSuccess()
{
  alert("Fixtures have been created.");
}


// Standard callbacks
function error(tx, error_message)
{
  alert("Error processing SQL: " + error_message);
}

function success()
{
  alert("SQL has processed.");
}

