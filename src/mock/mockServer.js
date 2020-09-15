// 模拟数据文件
// 引入 mockjs包

import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
// Mock.mock 就是把数据和路径注册为接口
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})




// 最后在main.js中引入模块