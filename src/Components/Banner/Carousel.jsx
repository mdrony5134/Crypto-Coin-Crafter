/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../Context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyle = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoin = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
    console.log(data);
  };

  // console.log(trending)

  useEffect(() => {
    fetchTrendingCoin();
  }, [currency]);

  const classes = useStyle();

  const items = trending.map((coin, index) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        key={index}
        className={classes.carouselItem}
        to={`/coin/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 8 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit > 0 ? "green" : "red" }}>
            {profit && " + "} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price?.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        autoPlayInterval={1000}
        infinite
        disableDotsControls
        disableButtonsControls
        animationDuration={1500}
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
