import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../Context/CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setAlert } = CryptoState();

  const handleLogin = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill the filed",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successfully. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <div>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "25px",
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button
          variant="outlined"
          size="large"
          style={{ backgroundColor: "gold", color: "black" }}
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
