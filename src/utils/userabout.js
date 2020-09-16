// 引入uuidv4函数
import {
    v4 as uuidv4
} from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// 获取用户的临时id,并向外暴露
export function getUserTempId() {
    //UserTempId代表用户的临时身份标识，一般我们一个用户有一个临时标识就ok了，不需要每次都更新
    //生成的标识先在localStorage当中存储，每次发请求的时候从localStorage中获取，没有再去创建新的

    //首先先从localStorage去获取，如果有那就不用创建新的，直接使用
    //如果没有再去创建一个新的，并且要存储到localStorage

    //获取临时id,大写为约定成俗的，如果获取不到返回null
    let userTempId = localStorage.getItem('USERTEMPID_KEY')
    //如果不存在
    if (!userTempId) {
        //重新生成一个
        userTempId = uuidv4()
        // 存在localStorage里边
        localStorage.setItem('USERTEMPID_KEY', userTempId)
    }

    //最后返回userTempId
    return userTempId
}

