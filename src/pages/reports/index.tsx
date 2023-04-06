import Layout from "@/components/Layout";
import React from "react";
import styled from  "@/assets/css/reports.module.css"

interface Props {

}

const Page = ({}:Props) =>{
    return (
        <div className={styled.reports_management_wrapper}>
            {/* <p className={styled.reports_management_title}>Reports Management</p> */}
            <p style={{
                display:'flex',
                marginBottom:'20px',
                fontFamily:"sans-serif",
                fontSize:'25px',
                fontWeight:600
            }}>Reports Management</p>
        </div>
    )
}
export default Page;
Page.Layout = Layout