import Layout from "@/components/Layout";
import React from "react";
import styled from  "@/assets/css/dashboard.module.css"
import Link from "next/link";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ['latin'] })

interface Props {

}

const Page = ({}:Props) =>{
    return (
        <Layout select="1">
            <div className={styled.reports_management_wrapper}>
                {/* <p className={styled.reports_management_title}>Reports Management</p> */}
                <p style={{
                    display:'flex',
                    marginBottom:'20px',
                    fontFamily:"sans-serif",
                    fontSize:'25px',
                    fontWeight:600
                }}>Dashboard</p>
                <div className={styled.grid}>
                <Link
                    href="/reports"
                    className={styled.card}
                >
                <h2 className={inter.className}>
                    Docs <span>-&gt;</span>
                </h2>
                <p className={inter.className}>
                    Find in-depth information about Next.js features and API.
                </p>
                </Link>

                <Link
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styled.card}
                >
                <h2 className={inter.className}>
                    Templates <span>-&gt;</span>
                </h2>
                <p className={inter.className}>Explore the Next.js 13 playground.</p>
                </Link>

                <Link
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styled.card}
                >
                <h2 className={inter.className}>
                    Deploy <span>-&gt;</span>
                </h2>
                <p className={inter.className}>
                    Instantly deploy your Next.js site to a shareable URL with Vercel.
                </p>
                </Link>
            </div>
            </div>
        </Layout>
    )
}
export default Page;