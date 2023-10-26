import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { auth, db } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import axios from "axios";
import { CoinList } from "../config/api";

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("BDT");
  const [symbol, setSymbol] = useState("৳");
  const [user, setUser] = useState(null);
  const [watchList, setWatchList] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (currency === "BDT") setSymbol("৳");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "INR") setSymbol("₹");
    else if (currency === "EUR") setSymbol("€");
  }, [currency]);

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
    // console.log(data);
  };
  // console.log(coins);
  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      // console.log(user)
    });
  }, []);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          // console.log(coin.data().coins)
          setWatchList(coin.data().coins);
        } else {
          console.log("No items in watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <div>
      <Crypto.Provider
        value={{
          coins,
          loading,
          currency,
          symbol,
          setCurrency,
          alert,
          setAlert,
          user,
          watchList,
        }}
      >
        {children}
      </Crypto.Provider>
    </div>
  );
};

export default CryptoContext;

// custom hook
export const CryptoState = () => {
  return useContext(Crypto);
};
