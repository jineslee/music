function common (sql,callback){
    let mysql=require('mysql');
    let connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'music'
    });
    //连接数据库
    connection.connect();
    //查询数据库
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
    // 关闭数据库
    connection.end();
}

module.exports=common