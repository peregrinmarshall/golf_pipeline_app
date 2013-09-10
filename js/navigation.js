var pageArray = new Array(
  "profile",
  "home",
  "search-times",
  "upcoming-golf",
  "activities",
  "search-courses");

$(document).ready( function()
{

  $("div[data-role=page]").on('swipeleft', function(event)
  {
    startingPageName = $(this).attr("id").split("_")[1];
    key = pageArray.indexOf(startingPageName);
    targetPageName = pageArray[key+1];
    if ($("#page_" + targetPageName).length > 0)
      $.mobile.changePage($("#page_" + targetPageName), {transition: "slide", reverse: false}, true, true);
  });

  $("div[data-role=page]").on('swiperight', function(event)
  {
    startingPageName = $(this).attr("id").split("_")[1];
    key = pageArray.indexOf(startingPageName);
    targetPageName = pageArray[key-1];
    if ($("#page_" + targetPageName).length > 0)
      $.mobile.changePage($("#page_" + targetPageName), {transition: "slide", reverse: true}, true, true);
  });

});

$(document).on("pagebeforehide", function(e)
{
  target = e.currentTarget.URL.split("page_")[1];

  if (target == "profile")
    offset = "35%"
  else if (target == "search-times")
    offset = "-25%"
  else if (target == "upcoming-golf")
    offset = "-55%"
  else if (target == "activities")
    offset = "-85%"
  else if (target == "search-courses")
    offset = "-115%"
  else
    offset = "5%";

  if (typeof target != "undefined")
  {
    $(".slider_bg").animate(
    {
      left: offset
    }, 500);
  }

  setTimeout(google.maps.event.trigger(map, 'resize'), 150);
});

