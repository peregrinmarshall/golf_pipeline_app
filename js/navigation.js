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

  $(document).on("pagechange", function(e)
  {
    target = e.currentTarget.URL.split("_")[1];

    if (target == "profile")
      offset = "12"
    else if (target == "search-times")
      offset = "-79"
    else
      offset = "-35";

    $(".nav_strip ul").css("left", offset + "%");
  });

});
