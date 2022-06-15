const { Schema } = require('mongoose')
const examinationSchema = new Schema({
    /*
    * 门诊挂号姓名 
    */
    name: {
        type: String,
        required: true
    },
    /*
    * 门诊挂号 性别 0男 1女
    */
    sex: {
        type: String,
        required: true
    },
    /*
    * 门诊挂号姓名 年龄
    */
    age: {
        type: String,
        required: true
    },
    /*
    * 门诊挂号姓名 预约日期
    */
    date: {
        type: String,
        required: true
    },
    /*
    * 门诊挂号姓名 家庭地址
    */
    address: {
        type: String,
        required: true
    },
    /*
    * 门诊挂号姓名 手机号
    */
    phone: {
        type: String,
        required: true
    },
    /*
    * 门诊挂号 科室
    */
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'department'
    },
    /*
    * 门诊挂号 医生
    */
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    /*
     * 门诊状态 0为待诊断 1 为转到检验 2为检验完毕 3为诊断完毕
     */
    state: {
        type: Number,
        default: 0
    },
    /*
    * 检验项目
    */
    emeresultrgencyItem: {
        type: String,
        default: ''
    },
    /*
    * 检验结果
    */
    emeresultrgency: {
        type: String,
        default: ''
    },
    /*
    * 诊断结果
    */
    diagnosticresults: {
        type: String,
        default: ''
    },

    /*
     * 检验 检查人
     */
    user: {
        type: String,
        default: ''
    },


    /*
     * 创建时间
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
})
module.exports = examinationSchema