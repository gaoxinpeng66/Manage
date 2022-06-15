const express = require('express');
const router = require('./routers');
const checkLogin = require('./middlewares/checkLogin');

const app = express();

// 配置cors 跨域
const cors = require('cors')
app.use(cors())

// 配置解析表单数据中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
   if (req.path==='/login') {
        return next()
   }
   checkLogin()(req,res,next)
})

app.use(router)

app.use((err, req, res, next) => {
    res.send({
        status: 1,
        data: err
    })
})


app.listen(8080, () => {
    console.log('http://localhost:8080/');
});