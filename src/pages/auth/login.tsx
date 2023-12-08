import FormHelper from "@/pageComponents/FormHelper";
import { IFormData } from "@/pageComponents/FormHelper/FormHelper.types";
import { loginStructure } from "@/pageComponents/formStructure/loginStructure";
import "@/pageComponents/pageStyled/Login.styled.css";
import { setCredential, setUser } from "@/reducer";
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
      const response = await authApi.login(data);
      if (
        response.data.user.Roles?.find(
          (role: any) => role.roleName === "superUser"
        )
      ) {
        toast.success(`Xin chào ${response.data.user.account.userName}`);
        dispatch(setCredential({ token: response.data.token }));
        setHeaderConfigAxios(response.data.token);
        localStorage.setItem("token", response.data.token);
        // const user = await authApi.getProfile();
        dispatch(setUser(response.data.user));
        router.push("/dashboard");
      } else {
        toast.error("Bạn không có quyền truy cập!");
      }
    } catch (e: any) {
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
