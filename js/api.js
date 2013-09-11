function connect(url, type, data, sendToken)
{
  $("#loading").show();
  var response = false;
  if (window.localStorage.getItem("token") && typeof data !== "undefined" && sendToken)
    data["auth_token"] = window.localStorage.getItem("token");
  if (type == "get")
  {
    data = $.param(data);
    url = url + "?" + data;
  }
  else
    data = JSON.stringify(data);

  var api = $.ajax(
  {
    url: window.localStorage.getItem("remote_url") + url,
    type: type,
    traditional: true,
    async: false,
    timeout: 10000,
    data: data,
    headers:
    {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    dataType: "json",
    success: function(feedback)
    {
      $("#loading").hide();
      response = feedback;
      if (typeof feedback == "undefined")
        response = true;
    }
  }).fail( function(c) {
    $("#loading").hide();
    if (c.status != "401")
      alert("Please review your input and try again.");
  });

  return response;
}
