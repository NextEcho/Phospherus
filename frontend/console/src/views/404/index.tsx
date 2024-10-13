import React from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center bg-[#222943]">
            <div className='transition-shadow duration-400 hover:shadow-xl'>
                <Result
                    status="404"
                    title={<span className="text-slate-50 font-code">Page Not Found</span>}
                    subTitle={<span className="text-slate-300 font-main text-xl">😥该页面似乎不存在哦</span>}
                    extra={
                        <button className='btn-violet text-slate-100' onClick={() => navigate('/console/home')}>返回首页</button>
                    }
                    className="bg-[#272E48] p-8 rounded-lg"
                />
            </div>
        </div>
    );
};

export default NotFound;
