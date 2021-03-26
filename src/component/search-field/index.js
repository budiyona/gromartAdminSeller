import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
  buttonRed: {
    backgroundColor: red[500],
    color: "white",
  },
  searchField: {
    width: "150px",
    boxSizing: "border-box",
  },
}));

export default function SearchField(props) {
  const classes = useStyles();
  const [target, setTarget] = React.useState("");
  const [showClear, setClear] = React.useState(false);

  const handleChange = () => (event) => {
    console.log(event.target.value);
    setTarget(event.target.value);
    target >= 0 && setClear(true);
  };
  const clearButton = () => {
    console.log("clear");
    setTarget("");
    setClear(false);
    props.resetData();
  };
  return (
    <div className={classes.root}>
      <div className={classes.searchField}>
        <FormControl>
          <Input
            fullWidth
            placeholder="search..."
            onChange={handleChange()}
            value={target}
            endAdornment={
              showClear && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={clearButton}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </FormControl>
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => props.onClick(target)}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
