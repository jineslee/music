const express = require('express')

const Music = require('../models/music')

const router = module.exports = express.Router()

router.prefix = '/api'

/**
 * GET /api/music
 */
router.get('/music', (req, res) => {
  // JSONP在当下的WEB开发过程中经常用到，express就是将经常用到的东西进行封装
  // res.send(`${req.query.cb} && ${req.query.cb}(${JSON.stringify(Music.getList())})`)
  // res.send(`foo(${Music.getList()})`)
  // jsonp方法中会自动接收客户端传来的回调函数名称
  Music.find((list)=>{
    if (!list){
     // 不存在这个数据
     return res.status(404).send('没有该记录')
    }
   res.jsonp(list)
  })
})

/**
 * GET /api/music/:id
 */
router.get('/music/:id', (req, res) => {
  const id = parseInt(req.params.id || 0)
  if (!id) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  Music.findOne(id,(item)=>{
    if (!item) {
    // 不存在这个数据
    return res.status(404).send('没有该记录')
  }
  res.jsonp(item)
  })
  
})
