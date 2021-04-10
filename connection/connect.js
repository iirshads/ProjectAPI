var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'admin',
        password: 'irshad123',
        server: 'dbprjone.cyyssfsgzp9z.us-east-2.rds.amazonaws.com',
        database: 'Company'
    });

    return conn;
};

module.exports = connect;