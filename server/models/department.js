const { Schema } = require('mongoose')
const departmentSchema = new Schema({
    /*
    * 部门名称
    */
    name: {
        type: String,
        required: true
    },
    /*
    * 处理删除 正常1 删除0
    */
    state: {
        type: Number,
        default: 1
    },
    /*
    * 是否可外挂号 默认可以
    */
    cuurent: {
        type: Number,
        default: 1
    },
    /*
    * 部门状态 启用1 / 禁用0
    */
    switchs: {
        type: Number,
        default: 1
    },
    /*
     * 部门创建时间
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /*
     * 部门更新时间
     */
    updatedAt: {
        type: Date,
        default: Date.now
    },

})
module.exports = departmentSchema