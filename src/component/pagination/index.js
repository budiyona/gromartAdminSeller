// import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import React, { Component } from "react";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(1),
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
//   page: {
//     marginLeft: 0,
//   },
//   center: {
//     margin: "auto",
//   },
// }));
const useStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
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
});

// export default function PaginationControlled(props) {
//   // console.log(props);
//   const classes = useStyles();
//   const [page, setPage] = React.useState(1);
//   const handleChange = (event, value) => {
//     setPage(value);
//     props.onClick(value);
//   };

//   return (
//     <div className={classes.root}>
//       <div>
//         <Typography className={classes.page}>Page: {page}</Typography>
//       </div>
//       <div className={classes.center}>
//         <Pagination count={props.count} page={page} onChange={handleChange} />
//         {/* <Pagination count={props.page} onChange={handleChange} /> */}
//       </div>
//     </div>
//   );
// }

class PaginationControlled extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { count, page, onChange, classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Typography className={classes.page}>Page: {page}</Typography>
        </div>
        <div className={classes.center}>
          <Pagination count={count} page={page} onChange={onChange} />
          {/* <Pagination count={props.page} onChange={handleChange} /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(PaginationControlled);
