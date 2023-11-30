import React from "react";
import RegisterForm from "../../features/User/RegisterForm";

const RegisterPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>회원가입</h1>
      <RegisterForm />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    margin: 0,
  },
  heading: {
    textAlign: "center",
  },
};

export default RegisterPage;
