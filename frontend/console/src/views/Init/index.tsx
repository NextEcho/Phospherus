import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RiHomeFill, RiLockPasswordFill, RiMailAddFill, RiUserFill } from "react-icons/ri";
import { initSystemAPI, validateInitStatusAPI } from "@/api/init";
import { message } from "antd";

const Init: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [formData, setFormData] = useState({
        passport: "",
        password: "",
        confirmPassword: "",
        email: "",
        siteName: "",
    });

    const navigateTo = useNavigate();

    useEffect(() => {
        validateInitStatus();
    }, []);

    const validateInitStatus = useCallback(async () => {
        try {
            const jsonResp = await validateInitStatusAPI();
            if (jsonResp.code === 0) {
                navigateTo("/");
            }
        } catch (error) {
            console.error("检查系统初始化状态时出错:", error);
        }
    }, []);

    const nextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setStep(step + 1);
    }
    const prevStep = () => setStep(step - 1);

    useEffect(() => {
        if (step === 1) {
            setIsNextDisabled(!(formData.passport && formData.password && formData.confirmPassword));
        } else if (step === 2) {
            setIsNextDisabled(!(formData.email && formData.siteName));
        }
    }, [formData, step]);

    const initSystem = async () => {
        try {
            const jsonResp = await initSystemAPI({
                passport: formData.passport,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                websiteName: formData.siteName,
                email: formData.email,
            });
            if (jsonResp.code === 0) {
                message.success("初始化成功");
                setTimeout(() => {
                    navigateTo("/login");
                }, 1000)
            } else {
                message.error("初始化出现错误");
            }

        } catch (err) {
            console.log("catch error:", err)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        if (step === 3) {
            initSystem();
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 font-main">
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="px-8 py-6">
                    <h2 className="text-3xl font-bold text-center text-white mb-6">系统初始化</h2>
                    <div className="flex justify-center mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`w-3 h-3 rounded-full mx-1 ${step >= i ? 'bg-violet-500' : 'bg-gray-600'}`}></div>
                        ))}
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <RiUserFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 autofill:bg-gray-700 autofill:text-white"
                                        type="text"
                                        name="passport"
                                        placeholder="管理员账户名"
                                        required
                                        value={formData.passport}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="relative">
                                    <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 autofill:bg-gray-700 autofill:text-white"
                                        type="password"
                                        name="password"
                                        placeholder="管理员密码"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="relative">
                                    <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 autofill:bg-gray-700 autofill:text-white"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="确认密码"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <RiMailAddFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                                        type="email"
                                        name="email"
                                        placeholder="管理员邮箱"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="relative">
                                    <RiHomeFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                                        type="text"
                                        name="siteName"
                                        placeholder="博客站点名称"
                                        required
                                        value={formData.siteName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="space-y-4">
                                <p className="text-white text-center">确认所有信息无误后，点击下方按钮完成初始化。</p>
                            </div>
                        )}
                        <div className="flex justify-between mt-8">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    上一步
                                </button>
                            )}
                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className={`px-6 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isNextDisabled}
                                >
                                    下一步
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                >
                                    完成初始化
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Init;
