import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue, green, red } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
import productImg from "../../static/product.jpg";
import { connect } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "axios";
const useStyles = () => ({
  root: {
    maxWidth: 248,
    fontSize: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  green: {
    color: green[500],
  },
  red: {
    color: red[500],
  },
  blue: {
    color: blue[500],
  },
  pointer: {
    cursor: "pointer",
  },
});

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ["requested", "active", "inactive"],
      statusNow: "requested",
    };
  }
  status = () => {
    const { status, statusNow } = this.state;
    console.log("toogle status");
    console.log(statusNow);
    let newStatusIndex = status.findIndex((el) => statusNow === el);
    if (newStatusIndex >= 2) {
      newStatusIndex = 0;
    } else {
      newStatusIndex++;
    }
    this.setState({
      statusNow: status[newStatusIndex],
    });
  };
  // deleteProductById = (id) => {
  //   let choise = window.confirm("are you sure want to delete product");
  //   if (choise) {
  //     axios.delete("http://localhost:8080/api/product/" + id).then((res) => {
  //       if (res.status === 200) {
  //         alert("succesfully deleted product");
  //       } else {
  //         alert("delete failed");
  //       }
  //     });
  //   }
  // };
  render() {
    const { classes, product, user, history , deleteProductById} = this.props;
    const { statusNow } = this.state;
    return (
      <Card className={classes.root}>
        <CardHeader
          title={product.productName}
          subheader={product.productCode+` (${product.status})`}
          action={
            user.userCode.includes("ADMIN") ? (
              ""
            ) : (
              <IconButton aria-label="settings">
                <HighlightOffIcon
                  style={{ color: red[500] }}
                  onClick={() => deleteProductById(product.productCode)}
                />
              </IconButton>
            )
          }
        />
        <CardMedia
          className={user.userCode.includes("ADMIN") ? "" : classes.pointer}
          className={classes.media}
          image={productImg}
          onClick={
            user.userCode.includes("ADMIN")
              ? () => {}
              : () =>
                  history.push({
                    pathname: "/seller/product/update",
                    state: { idProduct: product.productCode },
                  })
          }
        />
        <CardActions disableSpacing>
          <Typography>Rp. {product.price},00</Typography>
        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};
export default connect(mapStateToProps)(withStyles(useStyles)(ProductCard));
