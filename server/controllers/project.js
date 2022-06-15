const { Project } = require('../models')
exports.list = async (req, res, next) => {
    try {
        const result = await Project.find()
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
        const project = await req.body
        const user = await req.user.name
        const result = {...project,user}
        const result2 = await new Project(result).save()
        res.send({
            status: 0,
            data: result2
        })
    } catch (err) {
        next(err)
    }
}
exports.updata = async (req, res, next) => {
    try {
        const project = req.body
        const result = await Project.findById(project._id)
        Object.assign(result,project)
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
        const project = req.body
        const result = await Project.findById(project._id)
        Object.assign(result,project)
        await result.save()
        res.send({
            status: 0, 
            data: result
        })
    } catch (err) {
        next(err)
    }
}