const common = require('./dbcommon.js')

class User {
    /**
   * 构造用户对象
   * @param  {number} id         标识
   * @param  {string} username   用户名
   * @param  {string} password   密码
   */
  constructor(id,username,password){
    this.id = id
    this.username=username
    this.password=password
  }

  // 根据用户名密码查询一个用户
  static findOne(username, password, callback){
    let sql='select * from users where username = \'' + username + '\' and password = \'' +password+ '\'';
    common(sql,function(result){
       let data={flag:'err'};
          if(result[0]){
              data.flag = 'ok';
          }
       callback(data);
    })
  }

}

module.exports = User