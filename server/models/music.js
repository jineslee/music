const common = require('./dbcommon.js')


/*音樂模型*/
class Music {
  /**
   * 构造音乐对象
   * @param  {number} id       标识
   * @param  {string} name     歌曲名
   * @param  {string} artist   艺术家
   * @param  {number} duration 时长
   * @param  {string} music    歌曲文件名
   * @param  {string} poster   海报文件名
   * @param  {string} lyric    歌词文件名
   * @return {Music}           音乐对象
   */
  constructor(id, name, artist, duration, music, poster, lyric) {
    this.id = id
    this.name = name
    this.artist = artist
    this.duration = duration
    this.music = music
    this.poster = poster
    this.lyric = lyric
  }

  static find(callback) {
    let sql='select * from songs '
    common(sql,function(result){
      callback(result);
    })
  }

  static findPage(page,callback){

      let start= 0 // 从第几条数据开始选择
      let pageSize = 5 // 每页显示的条数
      let sql = 'select * from posts  limit ?,?'

      common(sql,[(page-1)*pageSize,pageSize],(err, rows) => {
         // 调用
        callback(rows)
      })
  }

  static findOne(id,callback) {
    let sql='select * from songs where id=\'' + id + '\'';
    common(sql,function(result){
      callback(result[0]);
    })
  }

  static delete(id,callback) {
   let sql='delete from songs where id=\'' + id + '\'';

    common(sql,function(result){
      callback(result);
    })
  }

  save(callback) {
    let sql='insert into songs values(\''+this.id+'\',\''+this.name+'\',\''+this.artist+'\',\''+this.duration+'\',\''+this.music+'\',\''+this.poster+'\',\''+this.lyric+'\')'
    common(sql,function(result){
      result.affectedRows? callback(null, true): callback(null, false)
    })
  }

  update(callback) {
    let sql='update songs set name = \''+this.name+'\',artist= \''+this.artist+'\' where id=\''+this.id+'\''
    common(sql,function(result){
      result.affectedRows? callback(null, true): callback(null, false)
    })
  }
}

module.exports = Music