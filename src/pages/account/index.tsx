import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
// import { Image } from 'antd';
import { useToggleModal } from "@/hooks/application.hooks";
import "@/pageComponents/pageStyled/Account.styled.css";
import { ApplicationModal } from "@/reducer/app.reducer";
import { formatPrice } from "@/utils/Format";
import { Button } from "antd";
import { authSelector } from "@/reducer";

interface Props {}

const Page = ({}: Props) => {
  const { user } = useSelector(authSelector);
  const openUpdateProfile = useToggleModal(
    ApplicationModal.UPDATE_PROFILE_VIEW
  );
  const openChangePassword = useToggleModal(
    ApplicationModal.CHANGE_PASSWORD_VIEW
  );
  const openLogout = useToggleModal(ApplicationModal.LOGOUT_VIEW);

  return (
    <div className="account_main">
      <h1 className="account_title">Profile management</h1>
      <div className="account_body">
        <div className="account_form">
          <div className="account_content">
            <div className="account_content_left">
              <p
                style={{
                  fontWeight: "600",
                }}
                className="account_content_text"
              >
                Full name:
              </p>
            </div>
            <div className="account_content_right">
              <p className="account_content_text">{user?.account?.userName}</p>
            </div>
          </div>
          <div className="account_content">
            <div className="account_content_left">
              <p
                style={{
                  fontWeight: "600",
                }}
                className="account_content_text"
              >
                Email:
              </p>
            </div>
            <div className="account_content_right">
              <p className="account_content_text">{user?.account?.email}</p>
            </div>
          </div>
          <div className="account_content">
            <div className="account_content_left">
              <p
                style={{
                  fontWeight: "600",
                }}
                className="account_content_text"
              >
                Phone Number:
              </p>
            </div>
            <div className="account_content_right">
              <p className="account_content_text">{user?.phone}</p>
            </div>
          </div>
          {/* <div className="account_content">
            <div className="account_content_left">
              <p
                style={{
                  fontWeight: "600",
                }}
                className="account_content_text"
              >
                Base Salary:
              </p>
            </div>
            <div className="account_content_right">
              <p className="account_content_text">
                {formatPrice(user?.baseSalary)} VND
              </p>
            </div>
          </div> */}
          <div className="account_content">
            <div className="account_content_left">
              <p
                style={{
                  fontWeight: "600",
                }}
                className="account_content_text"
              >
                Gender:
              </p>
            </div>
            <div className="account_content_right">
              <p className="account_content_text">
                {user?.gender ? "Male" : "Female"}
              </p>
            </div>
          </div>
        </div>
        <div className="account_picture">
          {/* <Image 
                        src={`${process.env.NEXT_PUBLIC_API_URL}${userInfo?.profilePicture}`}
                        alt="Profile Picture"
                        width={300}
                        height={300}
                        style={{
                            resize:"both"
                        }}
                    /> */}
          {/* <Image
                        width={200}
                        // src="http://localhost:3000/_next/image?url=http%3A%2F%2F127.0.0.1%3A9001%2FuserImages%2F99124412-7652-48b8-a905-7b966ef7899e-1681544702941.jpeg&w=384&q=75"
                        src={`${process.env.NEXT_PUBLIC_API_URL}${userInfo?.profilePicture}`}
                    /> */}
        </div>
      </div>
      <div className="account_action">
        <Button size="large" onClick={openUpdateProfile}>
          Update profile
        </Button>
        <Button type="dashed" size="large" onClick={openChangePassword}>
          Change password
        </Button>
        <Button danger type="primary" size="large" onClick={openLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
export default Page;
Page.Layout = Layout;
Page.requireAuth = true;
