import Layout from "@/components/Layout";
import React from "react";
import {useSelector} from "react-redux";
import Image from 'next/image'
import '@/pageComponents/pageStyled/Account.styled.css'
import {formatPrice} from "@/utils/Format";
import {Button} from "antd";
import {useToggleModal} from "@/hooks/application.hooks";
import {ApplicationModal} from "@/reducer/app.reducer";

interface Props {

}

const Page = ({}:Props) =>{
    const { userInfo } = useSelector((state: any) => state.auth)
    const openUpdateProfile = useToggleModal(ApplicationModal.UPDATE_PROFILE_VIEW)
    const openChangePassword = useToggleModal(ApplicationModal.CHANGE_PASSWORD_VIEW)
    const openLogout = useToggleModal(ApplicationModal.LOGOUT_VIEW)

    return (
        <div className="account_main">
            <h1 className="account_title">Profile management</h1>
            <div className="account_body">
                <div className="account_form">
                    <div className="account_content">
                        <div className="account_content_left">
                            <p style={{
                                fontWeight:'600'
                            }} className="account_content_text">Full name:</p>
                        </div >
                        <div className="account_content_right">
                            <p  className="account_content_text">{userInfo?.name}</p>
                        </div>
                    </div>
                    <div className="account_content">
                        <div className="account_content_left">
                            <p style={{
                                fontWeight:'600'
                            }} className="account_content_text">Email:</p>
                        </div >
                        <div className="account_content_right">
                            <p  className="account_content_text">{userInfo?.email}</p>
                        </div>
                    </div>
                    <div className="account_content">
                        <div className="account_content_left">
                            <p style={{
                                fontWeight:'600'
                            }} className="account_content_text">Phone Number:</p>
                        </div >
                        <div className="account_content_right">
                            <p  className="account_content_text">{userInfo?.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="account_content">
                        <div className="account_content_left">
                            <p style={{
                                fontWeight:'600'
                            }} className="account_content_text">Base Salary:</p>
                        </div >
                        <div className="account_content_right">
                            <p  className="account_content_text">{formatPrice(userInfo?.baseSalary)} VND</p>
                        </div>
                    </div>
                    <div className="account_content">
                        <div className="account_content_left">
                            <p style={{
                                fontWeight:'600'
                            }} className="account_content_text">Gender:</p>
                        </div >
                        <div className="account_content_right">
                            <p  className="account_content_text">{userInfo?.gender}</p>
                        </div>
                    </div>
                </div>
                <div className="account_picture">
                    <Image 
                        src={`${process.env.NEXT_PUBLIC_API_URL}${userInfo?.profilePicture}`}
                        alt="Profile Picture"
                        width={300}
                        height={300}
                        style={{
                            resize:"both"
                        }}
                    />
                </div>
            </div>
            <div className="account_action">
                <Button 
                    size="large"
                    onClick={openUpdateProfile}
                >
                    Update profile
                </Button>
                <Button 
                    type="primary"
                    size="large"
                    onClick={openChangePassword}
                >
                    Change password
                </Button>
                <Button 
                    danger
                    type='primary'
                    size="large"
                    onClick={openLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}
export default Page;
Page.Layout = Layout
Page.requireAuth = true