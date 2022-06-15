/*
* 验证登录中间件
*/
const jwt = require('jsonwebtoken')
const { tokenSecret } = require("../config")
const { User } = require('../models')
module.exports = function checkLogin() {
    return async (req, res, next) => {
        try {
            const token = req.get('Authorization')
            const result = jwt.verify(token, tokenSecret)
            const user = await User.findById(result.userId)
            req.user = user
            next()
        } catch (err) {
            res.send({
                status: 401,
                data: '登录已过期或者不正确请重新登录!'
            })
        }
    }
}