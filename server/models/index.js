const mongoose = require('mongoose');
// 1. 连接数据库
main().catch((err) => {
    console.log('连接数据库失败', err);
})
async function main() {
    await mongoose.connect('mongodb://localhost:27017/hospital');
    console.log('连接数据库成功');
}

// 2. 设计数据表结构（已抽离）且发布数据模型
module.exports = {
    User : mongoose.model('user',require('./user')),
    Role : mongoose.model('role',require('./role')),
    Menu : mongoose.model('menu',require('./menu')),
    Department : mongoose.model('department',require('./department')),
    Notice : mongoose.model('notice',require('./notice')),
    Examination : mongoose.model('examination',require('./examination')),
    Project : mongoose.model('project',require('./project')),
    Register : mongoose.model('register',require('./register')),


}