const { Schema } = require('mongoose')
const roleSchema = new Schema({
    /*
    * 角色名称
    */
    name: {
        type: String,
        required: true
    },
    /*
    * 角色拥有菜单
    */
    menus: {
        type:Array
    },
    /*
    * 角色状态 启用1 禁用0
    */
    state: {
        type: Number,
        default: 1
    },
    /*
     * 角色创建时间
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /*
     * 角色更新时间
     */
    updatedAt: {
        type: Date,
        default: Date.now
    },

})
module.exports = roleSchema