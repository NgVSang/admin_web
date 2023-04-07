import Layout from "@/components/Layout";
import React from "react";
import style from  "@/assets/css/requests.module.css"

interface Props {

}

const Page = ({}:Props) =>{
    return (
        <div className={style.requests_management_wrapper}>
            {/* <p className={style.requests_management_title}>Requests Management</p> */}
            <p style={{
                display:'flex',
                marginBottom:'20px',
                fontFamily:"sans-serif",
                fontSize:'25px',
                fontWeight:600
            }}>Requests Management</p>
        </div>
    )
}
export default Page;
Page.Layout = Layout
Page.requireAuth = true