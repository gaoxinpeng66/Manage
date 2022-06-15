const { Department } = require('../models')
exports.list = async (req, res, next) => {
    try {
        const result = await Department.find()
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
        const result = await new Department(req.body).save()
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
        const department = req.body
        department.updatedAt = Date.now() // 更新日期
        const result = await Department.findById(department._id)
        Object.assign(result,department)
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
        const department = req.body
        const result = await Department.findById(department._id)
        Object.assign(result,department)
        await result.save()
        res.send({
            status: 0, 
            data: result
        })
    } catch (err) {
        next(err)
    }
}
