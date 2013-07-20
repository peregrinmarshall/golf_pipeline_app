$(document).ready( function()
{
  $("#page_home").on('swipeleft', function(event)
  {
    $.mobile.changePage($("#page_search-times"), {transition: "slide", reverse: false}, true, true);
    $(".nav_strip ul").css("left","30px");
  });

  $("#page_search-times").on('swiperight', function(event)
  {
    $.mobile.changePage($("#page_home"), {transition: "slide", reverse: true}, true, true);
    $(".nav_strip ul").css("left","155px");
  });

});

