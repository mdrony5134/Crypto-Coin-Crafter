import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import Login from "./Login";
import SingUp from "./SingUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from "../../Context/CryptoContext";
import { auth } from "../../Firebase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    width: 400,
    color: "white",
  },
  googleBtn: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   console.log(value)
  const { setAlert } = CryptoState();
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleBtn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `SingIn successfully. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ width: 85, height: 40, backgroundColor: "gold" }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="SingUp" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={() => handleClose()} />}
            {value === 1 && <SingUp handleClose={() => handleClose()} />}
            <Box className={classes.googleBtn}>
              <span>OR</span>
              <GoogleButton
                onClick={handleGoogleBtn}
                style={{ width: "100%", outline: "none" }}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
