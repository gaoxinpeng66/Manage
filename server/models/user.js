const { Schema } = require('mongoose')
const userSchema = new Schema({
    /*
    * 用户名
    */
    username: {
        type: String,
        required: true
    },
    /*
    * 密码
    */
    password: {
        type: String,
        required: true
    },
    /*
    * 姓名
    */
    name: {
        type: String,
        required: true
    },
    /*
    * 启用 / 禁用
    */
    switchs: {
        type: Boolean,
        default: true
    },
    /*
    * 状态 删除0 
    */
    state: {
        type: Number,
        default: 1
    },
    /*
    * 所属角色
    */
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    },
    /*
    * 所属部门
    */
    departmentId:{
        type: Schema.Types.ObjectId,
        ref: 'department'
    },
    /*
     * 用户创建时间
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /*
     * 用户更新时间
     */
    updatedAt: {
        type: Date,
        default: Date.now
    },

})
module.exports = userSchema