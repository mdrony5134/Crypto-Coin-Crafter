import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  SelectButton: {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    cursor: "pointer",
  },
}));

const SelectButton = ({ children, onClick, selected }) => {
  const classes = useStyle();
  return (
    <span
      onClick={onClick}
      className={classes.SelectButton}
      style={{
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
