const { Schema } = require('mongoose')
const menuSchema = new Schema({
    /*
    * 菜单名称
    */
    title: {
        type: String,
        required: true
    },
    /*
    * 菜单key / 路径
    */
    key: {
        type: String,
        required: true
    },
    /*
    * 父级菜单id
    */
    parentId: {
        type: Schema.Types.ObjectId,
    },
    /*
    * 菜单状态 启用1 禁用0
    */
    state: {
        type: Number,
        default: 1
    },
    /*
    * 菜单分类 1表示一级菜单 2表示二级菜单
    */
    grade: {
        type: Number,
        default: 1
    },

})
module.exports = menuSchema