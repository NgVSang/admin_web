import FormHelper from "@/pageComponents/FormHelper";
import { IFormData } from "@/pageComponents/FormHelper/FormHelper.types";
import { loginStructure } from "@/pageComponents/formStructure/loginStructure";
import "@/pageComponents/pageStyled/Login.styled.css";
import { setCredentials, setToken } from "@/reducer/auth.reducer";
import * as authApi from "@/services/api/auth.api";
import { setHeaderConfigAxios } from "@/services/axios";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {}

function Page({}: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (formData: IFormData) => {
    try {
      const data = {
        username: formData.email as string,
        password: formData.password as string,
      };
      const response: any = await authApi.login(data);
      console.log(response);

      if (
        response.user.Roles?.find((role: any) => role.roleName === "superUser")
      ) {
        toast.success(`Xin chào ${response.user.account.userName}`);

        dispatch(setToken(response.token));
        setHeaderConfigAxios(response.token);
        localStorage.setItem("token", response.token);
        const user = await authApi.getProfile();
        console.log(user);
        dispatch(setCredentials(user));

        router.push("/dashboard");
      } else {
        toast.error("Bạn không có quyền truy cập!");
      }
    } catch (e: any) {
      // console.log(e.message);
      toast.error(e.message);
    }
  };

  return (
    <div className="main_login">
      <div className="main_login_form">
        <FormHelper formStructure={loginStructure} onSubmit={handleLogin} />
      </div>
    </div>
  );
}
export default Page;
