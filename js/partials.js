$(document).ready( function()
{
  //$(".header").html('<a href="index.html" data-rel="back" data-theme="none"><img src="./img/button_back.png" /></a><center><a href="#page_home" data-theme="none"><img src="./img/logo.png" class="mini_logo" /></a></center><a href="#page_options" data-theme="none"><img src="./img/icon_gear.png" /></a><div class="nav_strip"><ul><center><li>Profile</li><li>Home</li><li>Search Tee Times</li></center></ul><br class="clear" /><div id="white_arrow"><center>&#9650;</center></div></div>');
  $(".header").html(''+
    '<a href="index.html" data-rel="back" data-theme="none">'+
      '<img src="./img/button_back.png" style="position:relative;top:-2px;" />'+
    '</a>'+
    '<center>'+
      '<a href="#page_home" data-theme="none">'+
        '<img src="./img/logo.png" class="mini_logo" />'+
      '</a>'+
    '</center>'+
    '<div class="slider_box">'+
      '<div class="slider_bg">'+
        '<a>Profile</a>'+
        '<a>Home</a>'+
        '<a>Search Tee Times</a>'+
        '<a>Upcoming Golf</a>'+
        '<a>Friend Activity</a>'+
        '<a>Courses</a>'+
      '</div>'+
      '<div id="white_arrow">&#9650;</div>'+
    '</div>'+
  '');

  $(".footer").html('<div data-role="navbar" data-iconpos="left"><ul><li><a href="#page_social" data-icon="bars" data-transition="slideup" data-theme="a"><span class="notification_count"></span> Notification<span class="notification_plural">s</span></a></li></ul></div>');
});
