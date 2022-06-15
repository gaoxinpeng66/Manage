const { Examination, Project } = require('../models')
exports.list = async (req, res, next) => {
    try {
        const patient = await Examination.find()
        const project = await Project.find()
        res.send({
            status: 0,
            data: { patient, project }
        })
    } catch (err) {
        next(err)
    }
}

exports.add = async (req, res, next) => {
    try {
        const result = await new Examination(req.body).save()
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
        const patient = req.body
        patient.user = req.user.name
        const result = await Examination.findById(patient._id)
        Object.assign(result, patient)
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
        const patient = req.params._id
        const result = await Examination.findOne({ _id: patient })
        res.send({
            status: 0,
            data: result
        })
    } catch (err) {
        next(err)
    }
}
