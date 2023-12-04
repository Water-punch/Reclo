import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import useUserStore from "../../stores/user";
import * as Api from "../../api/api";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const { login } = useUserStore();

  const handleSubmit = async (e) => {
    console.log(isLogin);
    e.preventDefault();
    try {
      await Api.post("user/logout");
      alert("로그아웃 완료");
      setIsLogin(false);
    } catch (err) {
      console.log("로그아웃 실패");
      navigate("/login");
    }
  };

  const handleMyPage = () => {
    if (login) navigate("/mypage");
    else {
      alert("로그인이 필요한 서비스입니다");
      navigate("/login");
    }
  };

  return (
    <>
      <Box component="form" className="header" onSubmit={handleSubmit}>
        <ButtonGroup
          color="success"
          variant="text"
          aria-label="text button group"
        >
          {isLogin === false ? (
            <Button
              sx={{ color: "black" }}
              variant="text"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Button>
          ) : (
            <Button type="submit" sx={{ color: "black" }} variant="text">
              로그아웃
            </Button>
          )}
          <Button
            sx={{ color: "black" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            회원가입
          </Button>
          <Button
            sx={{ color: "black" }}
            onClick={() => {
              handleMyPage;
            }}
          >
            마이페이지
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default Header;
