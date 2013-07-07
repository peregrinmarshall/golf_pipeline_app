$(document).ready( function()
{
  $("#page_home").on('swipeleft', function(event)
  {
    $.mobile.changePage($("#page_home2"), {transition: "slide", reverse: false}, true, true);
  });

  $("#page_home2").on('swiperight', function(event)
  {
    $.mobile.changePage($("#page_home"), {transition: "slide", reverse: true}, true, true);
  });
});

