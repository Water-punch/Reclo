import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Stack, Button, Typography } from "@mui/material";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Stack spacing={2} direction="row" my={3}>
        <Typography
          variant="h3"
          onClick={() => {
            navigate("/");
          }}
        >
          RE:CLO
        </Typography>
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
        <Button
          variant="outlined"
          color="success"
          sx={{ flexShrink: 0 }}
          onClick={() => {
            navigate("/activity");
          }}
        >
          💬거래진행
        </Button>
      </Stack>
    </div>
  );
};

export default NavBar;
