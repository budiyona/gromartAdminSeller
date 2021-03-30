import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { Menu } from "../../component";
import axios from "axios";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
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
    let newErrorMsg = "";
    for (const property in product) {
      if (
        product[property] !== null &&
        property !== "createdDate" &&
        property !== "seller"
      ) {
        if (property === "productCode") {
        } else if (property === "productName") {
          !this.lengthValidation(product[property]) &&
            (newErrorMsg = "name cannot be null");
        } else if (property === "price" || property === "stock") {
          !this.lengthValidation(product[property]) &&
            (newErrorMsg = property + " cannot be null or minus");
        } else {
          !this.lengthValidation(product[property]) &&
            (newErrorMsg = property + " cannot be null");
        }
      }
    }
    this.setState({
      errorMsg: newErrorMsg,
    });
    if (newErrorMsg.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  lengthValidation = (value) => {
    console.log(value);
    let number = parseInt(value);
    if (isNaN(number)) {
      return value.length > 0;
    }
    return value >= 0;
  };
  saveProduct = (e) => {
    e.preventDefault();
    const { product } = this.state;
    const { toDo, user, history } = this.props;
    let validation = this.handleValidation();
    console.log(validation);
    if (toDo === "create") {
      console.log("save product");
      console.log(product);
      if (validation) {
        axios
          .post(
            "http://localhost:8080/api/product?id=" + user.userCode,
            product
          )
          .then((res) => {
            console.log("save product");
            alert(res.data);
            history.push("/seller/product");
          })
          .catch((e) => {
            if (e.response !== undefined) {
              alert(e.response.data);
            }
          });
      }
    } else {
      console.log("update product");
      if (validation) {
        axios
          .put("http://localhost:8080/api/product?id=" + user.userCode, product)
          .then((res) => {
            console.log("update product");
            alert(res.data);
            history.push("/seller/product");
          })
          .catch((e) => {
            if (e.response !== undefined) {
              alert(e.response.data);
            }
          });
      }
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
            <Paper
              elevation={3}
              style={{
                marginTop: "10px",
                width: "100%",
                minHeight: "70vh",
                padding: "10px",
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            >
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
                    inputProps={{ maxLength: 20 }}
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
                    inputProps={{ min: 0 }}
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
                    inputProps={{ min: 0 }}
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
                  <ButtonGroup fullWidth>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      {toDo === "create" ? "Save" : "Update"}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                      onClick={() => {
                        let choise = window.confirm(
                          "are you sure to discard the product"
                        );
                        choise && history.push("/seller/product");
                      }}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Grid>
              </form>
            </Paper>
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
