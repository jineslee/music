/**
 *   登录
 *   注销
 */
const express = require('express')
const router = module.exports = express.Router()
const User = require('../models/user.js')

router.prefix = '/account'

router.get('/login',(req,res)=>{
  res.locals.title = '登录'
  res.render('user/login')
})
/**
 * POST /account/login
 */
router.post('/login', (req, res ) => {
     User.findOne(req.body.username,req.body.password, (user) => {
      if(!user) return res.send(user.flag)
      
     //此时说明用户名密码是正确的,// 每一个用户之前不共享res.session.userinfo值
     req.session.userinfo=user
     res.send(user.flag)
     })
})


/**
 * POST /account/signout
 * 注销
 */
router.post('/signout', (req, res) => {
  // req.session.userinfo
  delete req.session.userinfo
  res.send({err_msg : 'ok'})
})

router.get('/signout', (req, res) => {
  // req.session.userinfo
  delete req.session.userinfo
  res.redirect('/account/login')
})