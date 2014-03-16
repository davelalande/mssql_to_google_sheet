function database_connection() {

var conn = Jdbc.getConnection("jdbc:sqlserver://IP-address:1433;" + "databaseName=DBName;user=username;password=password;");
  var stmt = conn.createStatement();

  stmt.setMaxRows(500);

  var start = new Date();

  var rs = stmt.executeQuery('select * from users');

  var doc = SpreadsheetApp.getActiveSpreadsheet();

  var cell = doc.getRange('a1');

  var row = 0;

  while (rs.next()) {

    for (var col = 0; col < rs.getMetaData().getColumnCount(); col++) {

      cell.offset(row, col).setValue(rs.getString(col + 1));

    }

    row++;

  }

  rs.close();

  stmt.close();

  conn.close();

  var end = new Date();

  Logger.log('Time elapsed: ' + (end.getTime() - start.getTime()));

}