import axios from "axios";
import { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../Context/CryptoContext";
import { useNavigate } from "react-router-dom";

import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { numberWithCommas } from "./Banner/Carousel";
import { Pagination } from "@material-ui/lab";

// Material ui style
const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

const CoinTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { symbol, coins, loading } = CryptoState();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search for a cryptocurrency"
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head, index) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={index}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h >= 0;
                      return (
                        <TableRow
                          onClick={() => navigate(`/coin/${row.id}`)}
                          key={row.name}
                          className={classes.row}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 22,
                                  textTransform: "uppercase",
                                }}
                              >
                                {row?.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row?.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "green" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}{" "}
                            {row.price_change_percentage_24h.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}{" "}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: 20,
            }}
            count={(handleSearch()?.length / 10).toFixed(0)}
            variant="outlined"
            color="primary"
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CoinTable;
