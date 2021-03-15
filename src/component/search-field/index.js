import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import ClearIcon from "@material-ui/icons/Clear";
import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
}));

export default function SearchField() {
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
  };
  return (
    <Grid container item xs={12} className={classes.margin} alignItems="center">
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={3}>
        <FormControl>
          <Input
            fullWidth
            placeholder="search..."
            inputProps={{ "aria-label": "description" }}
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
      </Grid>
      <Grid item xs={1}>
        <Button variant="outlined" color="secondary" size="small">
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
