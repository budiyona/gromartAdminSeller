import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { blue, green, red } from "@material-ui/core/colors";
import productImg from "../../static/product.jpg";
import { connect } from "react-redux";
import "./style.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
const useStyles = () => ({
  root: {
    maxWidth: 248,
    fontSize: 1,
  },
  media: {
    height: 0,
    paddingTop: "41.25%", // 16:9
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
    };
  }

  render() {
    const { classes, product, user, history, deleteProductById } = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader
          title={product.productName}
          subheader={product.productCode + ` (${product.status})`}
          action={
            user.userCode.includes("ADMIN") ? (
              ""
            ) : (
              <Tooltip title="Delete">
                <IconButton aria-label="settings">
                  <DeleteIcon
                    style={{ color: red[500] }}
                    onClick={() => deleteProductById(product.productCode)}
                  />
                </IconButton>
              </Tooltip>
            )
          }
        />

        <CardMedia
          className={
            user.userCode.includes("ADMIN")
              ? classes.media
              : classes.pointer + " " + classes.media
          }
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
          <div style={{ width: "50%" }}>
            <Typography>Rp. {product.price},00</Typography>
          </div>
          {!user.userCode.includes("ADMIN") && (
            <div
              style={{ width: "50%", textAlign: "right", paddingRight: "10px" }}
            >
              <Tooltip title="Edit">
                <IconButton
                  style={{ padding: "0px" }}
                  color="primary"
                  onClick={() =>
                    history.push({
                      pathname: "/seller/product/update",
                      state: { idProduct: product.productCode },
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
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
