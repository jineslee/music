'use strict';
const path = require('path');
const express = require('express');
const glob = require('glob');
const bodyParser = require('body-parser')
const session = require('express-session')
const app = module.exports = express()

// 处理静态资源
app.use(express.static(path.join(__dirname,'www')))

//设置渲染模板
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','xtpl')

app.use(bodyParser.urlencoded({ extended: false }))

// 设置session中间件
// app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
  cookie:{maxAge:200000}
}))

glob.sync('./controllers/*.js',{cwd: __dirname }).forEach((item) =>{
  const router=require(item);
  //const prefix=path.basename(item,'.js');
  app.use(router.prefix,router)
})

if (!module.parent) {
  // module.parent只有在当前文件被载入的情况下才会有值，否则为NULL
  // 可以利用这种机制判断是否是被依赖的情况
  const server = app.listen(process.env.PORT || 2080, error => {
    if (error) throw error
    const address = server.address()
    app.set('url', `http://127.0.0.1:${address.port}`)
    console.log('server is ready @ http://127.0.0.1:' + address.port)
  })
}

