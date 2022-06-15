import React from 'react'
import { Result } from 'antd';
const Nothingness = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="抱歉, 您访问的页面不存在."
        />
    )
}

export default Nothingness