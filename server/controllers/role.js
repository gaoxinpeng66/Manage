const { Role } = require('../models')
exports.list = async (req, res, next) => {
    try {
        const result = await Role.find()
        res.send({
            status: 0, 
            data: result
        })
    } catch (err) {
        next(err)
    }
}
exports.add = async (req, res, next) => {
    try {
        const result = await new Role(req.body).save()
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
        const role = req.body
        role.updatedAt = Date.now() // 更新日期
        const result = await Role.findById(role._id)
        Object.assign(result,role)
        await result.save()
        res.send({
            status: 0, 
            data: result
        })
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const role = req.body
        const result = await Role.findById(role._id)
        Object.assign(result,role)
        await result.save()
        res.send({
            status: 0, 
            data: result
        })
    } catch (err) {
        next(err)
    }
}
