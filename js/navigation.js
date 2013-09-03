$(document).ready( function()
{
  $("#page_home").on('swipeleft', function(event)
  {
    $.mobile.changePage($("#page_search-times"), {transition: "slide", reverse: false}, true, true);
  });

  $("#page_home").on('swiperight', function(event)
  {
    $.mobile.changePage($("#page_profile"), {transition: "slide", reverse: true}, true, true);
  });

  $("#page_search-times").on('swiperight', function(event)
  {
    $.mobile.changePage($("#page_home"), {transition: "slide", reverse: true}, true, true);
  });

  $("#page_profile").on('swipeleft', function(event)
  {
    $.mobile.changePage($("#page_home"), {transition: "slide", reverse: false}, true, true);
  });

  $(document).on("pagebeforehide", function(e)
  {
    target = e.currentTarget.URL.split("_")[1];

    if (target == "profile")
      offset = "25%"
    else if (target == "search-times")
      offset = "-75%"
    else if (target == "upcoming-golf")
      offset = "-125%"
    else
      offset = "-25%";

    //$(".slider_bg").css("left", offset + "%");
    $(".slider_bg").animate(
    {
      left: offset
    }, 500);
    //setTimeout(google.maps.event.trigger(map, 'resize'), 150);
  });

});
