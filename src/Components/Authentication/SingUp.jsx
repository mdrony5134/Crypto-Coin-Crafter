import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../Context/CryptoContext";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SingUp = ({ handleClose }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const { setAlert } = CryptoState();
  const handleSubmit = async () => {
    if (password !== confirmPass) {
      setAlert({
        open: true,
        message: "Password does not match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `SingUp Successfully. Welcome ${result.user.email}`,
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
        <TextField
          variant="outlined"
          type="password"
          label="Enter Your Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          fullWidth
        />
        <Button
          variant="outlined"
          size="large"
          style={{ backgroundColor: "gold", color: "black" }}
          onClick={() => handleSubmit()}
        >
          SingUp
        </Button>
      </Box>
    </div>
  );
};

export default SingUp;
