/**
 * 音乐
 */
const path = require('path')

const express = require('express')
const formidable = require('formidable')

const Music = require('../models/music.js')

const router = module.exports = express.Router()

router.prefix = '/music'

/**
 * GET /music/list
 */
router.get('/list', (req, res) => {
  if (!req.session.userinfo) {
        return res.redirect('../account/login')
  }
  Music.find((list) => {
    res.locals.title = '音乐列表'
    res.locals.list = list;
    //渲染模板
    res.render('music/list')
  })
})

/**
 * GET /music/add
 */
router.get('/add', (req, res) => {
  res.locals.title = '添加新音乐'
  res.render('music/add')
})

/**
 * POST /music/add
 */
router.post('/add', (req, res) => {
  const form = new formidable.IncomingForm()
  //设置上传文件存放的文件夹
  form.uploadDir = path.join(__dirname, '../www/uploads')
  //设置该属性为true可以使得上传的文件保持原来的文件的扩展名
  form.keepExtensions = true
  form.parse(req, (error, fields, files) => {
    if (error) throw error
    // 接收到客户端提交过来文件和填写的信息
    let id = 0;
    Music.find(result =>{
      result.forEach(m => { if (m.id > id) id = m.id })
      //console.log(m.id)
    // 此时不能保存完整路径
    const music = new Music(
      id + 1,
      fields.name,
      fields.artist,
      fields.duration,
      path.basename(files.music.path),
      path.basename(files.poster.path),
      path.basename(files.lyric.path)
    )
    music.save((err,result) =>{
      // result?res.send({err_msg:'ok'}):
      // res.send({err_msg:'err'}) 
    })
    res.redirect('/music/list')
    })
  })
})

/**
 * GET /music/edit/:id
 */
router.get('/edit/:id', (req, res) => {
  res.locals.title = '编辑'
    // 接收传过来的ID
  const id = parseInt(req.params.id || 0)
  if (!id) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  // 找到数组中的这个元素删除
   Music.findOne(id,function (result) {
     if (!result) {
    // 不存在这个数据
      return res.status(404).send('没有该记录')
    }
    res.locals.item = result
    res.render('music/edit')
  })
})
/**
 * POST /music/edit/:id
 */
router.post('/edit/:id', (req, res) => {
  res.locals.title = '编辑'
  // 接收传过来的ID
  const id = parseInt(req.params.id || 0)
  if (!id) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  // 找到数组中的这个元素删除
  Music.findOne(id,(temp)=>{
  if (!temp) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  temp.id=req.body.id
  temp.name = req.body.name
  temp.artist = req.body.artist
  const music =new Music(temp.id,temp.name,temp.artist)
  music.update((result)=>{
   // result?res.send({err_msg:'ok'}):res.send({err_msg:'err'})
    res.redirect('/music/list')
  })
  
 }) 
  
})

/**
 * GET /music/delete/:id
 */
router.get('/delete/:id', (req, res) => {
  // 接收传过来的ID
  const id = parseInt(req.params.id || 0)
  if (!id) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  // 找到数组中的这个元素删除
   Music.delete(id,function(item){
    if (!item) {
    // 不存在这个数据
      return res.status(404).send('没有该记录')
    }
    // 数据存在，需要删除
    res.redirect('/music/list')
    })
  
})