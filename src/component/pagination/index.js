import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  page: {
    marginLeft: 0,
  },
  center: {
    margin: "auto",
  },
}));

export default function PaginationControlled(props) {
  console.log(props);
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.page}>Page: {page}</Typography>
      </div>
      <div className={classes.center}>
        <Pagination count={props.page} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}
