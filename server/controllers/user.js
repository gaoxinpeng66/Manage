const { User,Role,Department } = require('../models')
exports.list = async (req, res, next) => {

    try {    
        const users = await User.find()
        const roles = await Role.find()
        const department = await Department.find()

        res.send({
            status: 0, 
            data: {users, roles,department}
        })
    } catch (err) {
        next(err)
    }
}

// exports.one = async (req, res, next) => {
//     try {
//         const user = req.body
//         const result = await User.findById(user.)
//         res.send({
//             status: 0, 
//             data: result
//         })
//     } catch (err) {
//         next(err)
//     }
// }

exports.add = async (req, res, next) => {
    try {
        const result = await new User(req.body).save()
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
        const user = req.body
        user.updatedAt = Date.now() // 更新日期
        const result = await User.findById(user._id)
        Object.assign(result,user)
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
        const user = req.body
        const result = await User.findById(user._id)
        Object.assign(result,user)
        await result.save()
        res.send({
            status: 0, 
            data: result
        })
    } catch (err) {
        next(err)
    }
}
