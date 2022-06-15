import axios from 'axios'
import { message } from 'antd';

const instance = axios.create({
    timeout: 5000
})

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = JSON.parse(localStorage.getItem("token"));
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (config) => {
        const data = config.data;
        if(data.status === 401) {
          message.error('身份验证失败，请重新登录')
          localStorage.removeItem("user")
          localStorage.removeItem("token")
         setTimeout(()=>{
            window.location.href = '/login'
         },2000)
        } else if (data.status !== 0) {
             // 全局错误拦截
             message.error(data.data)
             return  Promise.reject(config)
        }else {
            // 成功
            return data
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default instance