import { Container, Typography, makeStyles } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyle = makeStyles(() => ({
  banner: {
    backgroundImage: "url(../../../../../public/banner4.png)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    padding: 25,
    justifyContent: "space-around",
  },
  tagLine: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));
const Banner = () => {
  const classes = useStyle();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Coin Crafter
          </Typography>

          <Typography
            variant="subtitle1"
            style={{
              color: "#FFF6F6",
              fontFamily: "Montserrat",
              textTransform: "uppercase",
            }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
