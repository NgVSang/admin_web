import Layout from "@/components/Layout";
import React from "react";
import '@/pageComponents/pageStyled/Login.styled.css'
import FormHelper from "@/pageComponents/FormHelper";
import {loginStructure} from "@/pageComponents/formStructure/loginStructure";
import {IFormData} from "@/pageComponents/FormHelper/FormHelper.types";
import * as authApi from '@/services/api/auth.api'
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import { setCredentials, setToken } from '@/reducer/auth.reducer'
import {setHeaderConfigAxios} from "@/services/axios";

interface Props {

}

function Page({}:Props) {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = async (formData: IFormData) => {
        try {
            const data = {
                email: formData.email as string,
                password: formData.password as string,
            }
            const response = await authApi.login(data)
            if (response.data.info.role === 2){
                toast.success(`Xin chào ${response.data.info.name}`)
                dispatch(setCredentials(response.data.info))
                dispatch(setToken(response.data.access_token))
                setHeaderConfigAxios(response.data.access_token)
                localStorage.setItem('token',response.data.access_token)
                router.push('/dashboard')
            }else {
                toast.error("Bạn không có quyền truy cập!")
            }
        } catch (e: any) {
            // console.log(e.message);
            toast.error(e.message)
        }
      }

    return (
        <div className="main_login">
            <div className="main_login_form">
                <FormHelper 
                    formStructure={loginStructure}
                    onSubmit={handleLogin}
                />
            </div>
        </div>
    )
}
export default Page;