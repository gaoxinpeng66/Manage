const { Notice } = require('../models')
exports.list = async (req, res, next) => {
    try {
        const result = await Notice.find().sort([['createdAt',-1]])
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
        const content = await req.body
        const user = await req.user.name
        const result = {...content,user}
        const result2 = await new Notice(result).save()
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
        const notice = req.body
        const result = await Notice.findById(notice._id)
        Object.assign(result, notice)
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
        const notice = req.body
        const result = await Notice.findById(notice._id)
        Object.assign(result, notice)
        await result.save()
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
        const noticeId = req.params._id
        const result = await Notice.findOne({ _id: noticeId })
        res.send({
            status: 0,
            data: result
        })
    } catch (err) {
        next(err)
    }
}