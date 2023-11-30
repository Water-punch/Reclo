import { useNavigate } from "react-router-dom";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div style={{ height: "2vh" }} />
      <h1
        className="logo_space"
        onClick={() => {
          navigate("/");
        }}
      >
        RE:CLO
      </h1>
      <Stack spacing={2} direction="row" sx={{ marginBottom: "3vh" }}>
        <Button
          variant="text"
          color="success"
          onClick={() => {
            navigate("/intro");
          }}
          sx={{ flexShrink: 0 }}
        >
          서비스 소개
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ flexShrink: 0 }}
          onClick={() => {
            navigate("/contents");
          }}
        >
          거래/나눔
        </Button>
        <Button
          variant="outlined"
          color="success"
          sx={{ flexShrink: 0 }}
          onClick={() => {
            navigate("/event");
          }}
        >
          이벤트
        </Button>
      </Stack>
      <div style={{ height: "2vh" }} />
    </div>
  );
};

export default NavBar;
