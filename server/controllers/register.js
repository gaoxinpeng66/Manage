const { Register, Department, User } = require('../models')
exports.list = async (req, res, next) => {
    try {
        const register = await Register.find()
        const department = await Department.find()
        const user = await User.find()

        res.send({
            status: 0,
            data: { register, department, user }
        })
    } catch (err) {
        next(err)
    }
}

exports.add = async (req, res, next) => {
    try {
        const result = await new Register(req.body).save()
        res.send({
            status: 0,
            data: result
        })
    } catch (err) {
        next(err)
    }
}
exports.updata = async (req, res, next) => {
    try {
        const register = req.body
        const ret = await Department.findOne({_id:req.user.departmentId})
        if (ret.name === '检验科') {
            return register.user = req.user.name
        }else {
             console.log('不是检验科');
        }
        const result = await Register.findById(register._id)
        Object.assign(result, register)
        await result.save()
        console.log(result);
        res.send({
            status: 0,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

exports.detail = async (req, res, next) => {
    try {
        const register = req.params._id
        const result = await Register.findOne({ _id: register })
        res.send({
            status: 0,
            data: result
        })
    } catch (err) {
        next(err)
    }
}
