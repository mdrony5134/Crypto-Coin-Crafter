import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../Context/CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import SideBar from "./Authentication/SideBar";

// material ui style

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontWeight: "bolder",
    cursor: "pointer",
    fontSize: 25,
    fontFamily: "Montserrat",
  },
}));

const Header = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const { currency, setCurrency, user } = CryptoState();
  // console.log(currency)

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate("/")}
                className={classes.title}
                variant="h6"
              >
                Coin Crafter
              </Typography>

              <Select
                variant="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"BDT"}>BDT</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
              </Select>
              {user ? <SideBar /> : <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
