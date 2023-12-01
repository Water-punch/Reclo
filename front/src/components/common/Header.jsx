import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        className="header"
        // sx={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        //   '& > *': {
        //     m: 1,
        //   },
        // }}
      >
        <ButtonGroup
          color="success"
          variant="text"
          aria-label="text button group"
        >
          <Button
            sx={{ color: "black" }}
            variant="text"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Button>
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
              navigate("/mypage");
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
