const { Schema } = require('mongoose')
const examinationSchema = new Schema({
    /*
    * 体检人姓名 
    */
    name: {
        type: String,
        required: true
    },
    /*
    * 性别 0男 1女
    */
    sex: {
        type: String,
        required: true
    },
    /*
    * 年龄
    */
    age: {
        type: String,
        required: true
    },
    /*
    * 预约日期
    */
    date: {
        type: String,
        required: true
    },
    /*
    * 家庭地址
    */
    address: {
        type: String,
        required: true
    },
    /*
    * 手机号
    */
    phone: {
        type: String,
        required: true
    },
    /*
    * 体检项目Id
    */
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    /*
    * 紧急联系人
    */
    emergency: {
        type: String,
        required: true
    },
    /*
     * 体检状态 1为已体检
     */
    state: {
        type: Number,
        default: 0
    },
    /*
     * 检查人
     */
    user: {
        type: String,
        default: ''
    },

    /*
    * 体检结果
    */
    emeresultrgency: {
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