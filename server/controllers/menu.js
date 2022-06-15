const { Menu } = require('../models')
exports.list = async (req, res, next) => {
    try {
        const result = await Menu.find()
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
        const result = await new Menu(req.body).save()
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
        const menu = req.body
        const result = await Menu.findById(menu._id)
        Object.assign(result,menu)
        await result.save()
        res.send({
            status: 0, 
            data: result
        })
    } catch (err) {
        next(err)
    }
}
