import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";
import { CryptoState } from "../../Context/CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { numberWithCommas } from "../Banner/Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

const useStyles = makeStyles({
  container: {
    width: 350,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    fontFamily: "monospace",
  },
  profile: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: "92%",
    gap: 20,
  },
  picture: {
    width: 200,
    height: 200,
    objectFit: "contain",
    backgroundColor: "#279EFF",
    cursor: "pointer",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "gold",
    marginTop: 10,
  },
  watchList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "grey",
    overflow: "scroll",
    padding: 20,
    paddingTop: 10,
    borderRadius: 10,
    gap: 10,
  },
  coin: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
    width: "100%",
    padding: 10,
    backgroundColor: "gold",
    color: "black",
    borderRadius: 5,
    boxShadow: "0 0 3px black",
  },
});

export default function SideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { user, setAlert, coins, symbol, watchList } = CryptoState();

  const handleLogout = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: "Logout successfully",
      type: "success",
    });
  };

  const removeFromWatchList = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchList.filter((watch) => watch !== coin?.id),
      }),
        { merge: true };
      setAlert({
        open: true,
        message: `${coin.name} remove watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              backgroundColor: "#279EFF",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    fontWeight: "bolder",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchList}>
                  <span style={{ fontSize: 25, textShadow: "0 2px 5px black" }}>
                    Watch List
                  </span>
                  {coins.map((coin) => {
                    if (watchList.includes(coin.id)) {
                      return (
                        <div className={classes.coin} key={coin.id}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize={16}
                              onClick={() => removeFromWatchList(coin)}
                            />
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
