const { Schema } = require('mongoose')
const projectSchema = new Schema({
    /*
    * 体检套餐名
    */
    name: {
        type: String,
        required: true
    },
    /*
    * 体检套餐创建人
    */
    user: {
        type: String,
        required: true
    },
    /*
   * 体检套餐内容
   */
    content: {
        type: String,
        required: true
    },
    /*
    * 体检套餐状态 删除为0
    */
    state: {
        type: Number,
        default: 1
    },
    /*
     * 体检套餐创建时间
     */
    createdAt: {
        type: Date,
        default: Date.now
    },

})
module.exports = projectSchema