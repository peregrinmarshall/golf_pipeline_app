document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);

function onDeviceReady()
{
  db.transaction(populateQuery, error, populateSuccess);
  $("#login_form").submit( function(e) { login(); return false; });
  $("#login_form").validate();
}

function login()
{
  db.transaction(loginQuery, error);
}

function loginQuery(tx)
{
  user = $("#login_username").val();
  pass = $("#login_password").val();
  query = "SELECT * FROM users where username = '" + user + "' and password = '" + pass + "'";
  tx.executeSql(query, [], loginSuccess, error);
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
    $.mobile.changePage($('#home'));
}

function populateQuery(tx)
{
  tx.executeSql('DROP TABLE IF EXISTS users');
  tx.executeSql('CREATE TABLE IF NOT EXISTS users (id unique, username, password)');
  tx.executeSql('INSERT INTO users (id, username, password) VALUES (1, "test", "1234")');
  tx.executeSql('INSERT INTO users (id, username, password) VALUES (2, "test2", "4321")');
}

function populateSuccess()
{
  alert("Fixtures have been created.");
}


// Standard callbacks
function error(tx, err)
{
  alert("Error processing SQL: "+err);
}

function success()
{
  alert("SQL has processed.");
}
