import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { Menu } from "../../component";
import axios from "axios";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import { AddAlertRounded } from "@material-ui/icons";
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    margin: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  menuprofile: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});
class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        productCode: "",
        productName: "",
        price: "",
        stock: "",
        description: "",
        status: "active",
      },
      userCode: "",
      errorMsg: "",
    };
  }
  setValue = (e) => {
    const { name, value } = e.target;
    const { product } = this.state;
    console.log(name, value);
    let newProduct = { ...product, [name]: value };
    this.setState({
      product: newProduct,
    });
  };
  setErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg,
    });
  };
  handleValidation = () => {
    const { product } = this.state;
    let arrayKey = Object.keys(product);
    let newErrorMsg = "";
    arrayKey.map((key) => {
      if (product[key] !== null) {
        if (key === "productCode") {
        } else if (key === "productName") {
          console.log("k1", key);
          !this.lengthValidation(product[key]) &&
            (newErrorMsg = "name cannot be null");
        } else {
          console.log("k2", key);
          !this.lengthValidation(product[key]) &&
            (newErrorMsg = key + " cannot be null");
        }
      }
    });
    this.setState({
      errorMsg: newErrorMsg,
    });
    if (newErrorMsg.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  lengthValidation = (value) => {
    value += "";
    console.log("validation of value ", value);
    return value.length > 0;
  };
  saveProduct = (e) => {
    e.preventDefault();
    const { product } = this.state;
    const { toDo, user } = this.props;
    this.handleValidation();
    if (toDo === "create") {
      console.log("save product");
      console.log(product);
      axios
        .post("http://localhost:8080/api/product?id=" + user.userCode, product)
        .then((res) => {
          AddAlertRounded(res.data);
        })
        .catch((e) => {
          if (e.response !== undefined) {
            alert(e.response.data);
          }
        });
    } else {
      console.log("update product");
      axios
        .put("http://localhost:8080/api/product?id=" + user.userCode, product)
        .then((res) => {
          AddAlertRounded(res.data);
        })
        .catch((e) => {
          if (e.response !== undefined) {
            alert(e.response.data);
          }
        });
    }
  };
  getProductById() {
    console.log(this.props.history.location.state);
    let historyState = this.props.history.location.state;
    axios
      .get("http://localhost:8080/api/product/" + historyState.idProduct)
      .then((res) => {
        this.setState({
          product: res.data,
        });
      });
  }
  componentDidMount() {
    const { toDo } = this.props;
    if (toDo === "update") {
      this.getProductById();
    }
  }
  render() {
    console.log(this.state);
    // console.log(this.props);

    const { buttonAdminStat, history, toogleMenu, classes, toDo } = this.props;
    const { product, errorMsg } = this.state;
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid container item xs={12}>
          <Menu
            history={history}
            toogleMenu={toogleMenu}
            buttonAdminStat={buttonAdminStat}
          ></Menu>
        </Grid>
        <Grid container item xs={12} className={classes.margin}>
          <Grid container item xs={6} style={{ margin: "auto" }}>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.saveProduct}
            >
              {errorMsg.length > 0 ? (
                <Grid item>
                  <Box mb={2}>
                    <Alert icon={false} severity="warning">
                      {errorMsg}
                    </Alert>
                  </Box>
                </Grid>
              ) : (
                <Box style={{ height: "48px" }} mb={2}></Box>
              )}

              <Grid item>
                <TextField
                  size="small"
                  margin="dense"
                  name="productName"
                  required
                  fullWidth
                  label="Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={product.productName}
                  onChange={(e) => this.setValue(e)}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  size="small"
                  required
                  fullWidth
                  label="Price"
                  value={product.price}
                  name="price"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.setValue(e)}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  size="small"
                  required
                  fullWidth
                  value={product.stock}
                  label="Stock"
                  name="stock"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.setValue(e)}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  size="small"
                  required
                  fullWidth
                  value={product.description}
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.setValue(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth style={{ marginTop: "9px" }}>
                  <InputLabel>Status *</InputLabel>
                  <Select
                    name="status"
                    value={product.status}
                    onChange={(e) => this.setValue(e)}
                  >
                    <MenuItem value="inactive">InActive</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  hidden={true}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {toDo === "create" ? "Save" : "Update"}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(CreateProduct));
