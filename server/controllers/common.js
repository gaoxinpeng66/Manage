const { User } = require("../models")
const { tokenSecret } = require("../config")
const jwt = require('jsonwebtoken')
exports.login = async (req, res, next) => {
    try {
        const user = req.body
        const result = await User.findOne({ username: user.username })
        if (!result) {
            return res.send({
                status: 1,
                data: '用户名或者密码不正确'
            })
        }
        if (user.password !== result.password) {
            return res.send({
                status: 1,
                data: '用户名或者密码不正确'
            })
        }
        if (result.switchs === false) {
            return res.send({
                status: 1,
                data: '用户已被禁止登录,请联系管理员'
            })
        }
        if (result.state == 0) {
            return res.send({
                status: 1,
                data: '用户不存在,请联系管理员'
            })
        }
        const result1 = await result.populate({
            path: 'roleId departmentId',
        })
        const token = jwt.sign({
            userId: result1._id
        }, tokenSecret, {
            expiresIn: '1d'
        })
        res.send({
            status: 0,
            data: {
                token,
                result1
            }
        })
    } catch (err) {
        next(err)
    }
}
