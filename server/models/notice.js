const { Schema } = require('mongoose')
const noticeSchema = new Schema({
    /*
    * 公告标题
    */
    title: {
        type: String,
        required: true
    },
    /*
    * 公告内容
    */
    content: {
        type: String,
        required: true
    },
    /*
    * 公告状态 默认审核中 1是发布
    */
    condition: {
        type: Number,
        default: 0
    },
    /*
    * 公告发布人
    */
    user: {
        type: String,
        required: true
    },
    /*
    * 是否删除0 
    */
    state: {
        type: Number,
        default: 1
    },
    /*
     * 公告创建时间
     */
    createdAt: {
        type: Date,
        default: Date.now
    },

})
module.exports = noticeSchema