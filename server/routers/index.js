const express = require('express');
const routers = express.Router();
const commonController = require('../controllers/common');
const userController = require('../controllers/user');
const menuController = require('../controllers/menu');
const roleController = require('../controllers/role');
const departmentController = require('../controllers/department');
const noticetController = require('../controllers/notice');
const projectController = require('../controllers/project');
const examinationController = require('../controllers/examination');
const registerController = require('../controllers/register');

routers.post('/login', commonController.login); // 登录

routers.get('/user/list', userController.list); // 获取用户
routers.post('/user/add', userController.add); // 添加用户
routers.post('/user/updata', userController.updata); // 更新指定用户
routers.post('/user/delete', userController.delete); // 删除用户（只修改state）

routers.get('/menu/list', menuController.list); // 获取菜单
routers.post('/menu/add', menuController.add); // 添加菜单
routers.post('/menu/updata', menuController.updata); // 更新菜单状态

routers.get('/role/list', roleController.list); // 获取角色
routers.post('/role/add', roleController.add); // 添加角色
routers.post('/role/updata', roleController.updata); // 更新指定角色
routers.post('/role/delete', roleController.delete); // 删除角色（只修改state）

routers.get('/department/list', departmentController.list); // 获取科室
routers.post('/department/add', departmentController.add); // 添加科室
routers.post('/department/updata', departmentController.updata); // 更新科室
routers.post('/department/delete', departmentController.delete); // 删除科室

routers.get('/notice/list', noticetController.list); // 获取公告
routers.post('/notice/add', noticetController.add); // 添加公告
routers.post('/notice/updata', noticetController.updata); // 更新公告
routers.post('/notice/delete', noticetController.delete); // 删除公告（只修改state）
routers.get('/notice/detail/:_id', noticetController.detail); // 获取公告详情


routers.get('/project/list', projectController.list); // 获取体检套餐
routers.post('/project/add', projectController.add); // 添加体检套餐
routers.post('/project/updata', projectController.updata); // 更新体检套餐
routers.post('/project/delete', projectController.delete); // 删除体检套餐


routers.get('/examination/list', examinationController.list); // 获取体检患者
routers.post('/examination/add', examinationController.add); // 添加体检患者
routers.post('/examination/updata', examinationController.updata); // 更新体检患者
routers.get('/examination/detail/:_id', examinationController.detail); // 获取体检患者信息


routers.get('/register/list', registerController.list); // 获取门诊患者
routers.post('/register/add', registerController.add); // 添加门诊患者
routers.post('/register/updata', registerController.updata); // 更新门诊患者
routers.get('/register/detail/:_id', registerController.detail); // 获取门诊患者信息

module.exports = routers