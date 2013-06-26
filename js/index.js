document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
  var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
  db.transaction(populateDB, errorCB, successCB);
  $("#login_form").submit( function() { attemptLogin(); });
}

function queryDB(tx)
{
  user = $("#login_username").val();
  pass = $("#login_password").val();
  query = "SELECT * FROM users where username = '" + user + "' and password = '" + pass + "'";
  tx.executeSql(query, [], querySuccess, errorCB);
}

function querySuccess(tx, results)
{
  var len = results.rows.length;
  if (len == 0)
  {
    $("#login_errors").html("Your username and/or password were incorrect.");
    return false;
  }
  else
    $.mobile.changePage($('#pagetwo'));
}

function attemptLogin()
{
  var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
  db.transaction(queryDB, errorCB);
}

function populateDB(tx)
{
  tx.executeSql('DROP TABLE IF EXISTS users');
  tx.executeSql('CREATE TABLE IF NOT EXISTS users (id unique, username, password)');
  tx.executeSql('INSERT INTO users (id, username, password) VALUES (1, "test", "1234")');
  tx.executeSql('INSERT INTO users (id, username, password) VALUES (2, "test2", "4321")');
}

function errorCB(tx, err)
{
  alert("Error processing SQL: "+err);
}

function successCB()
{
  alert("Fixtures have been created.");
}
