import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Menu,
  PaginationControlled,
  ProductCard,
  SearchField,
} from "../../component";
import { red } from "@material-ui/core/colors";

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  buttonRed: {
    backgroundColor: red[500],
    color: "white",
  },
});
class AdminSellerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          productCode: "",
          productName: "",
          price: 0,
          stock: 0,
          description: "",
          seller: {
            userCode: "",
            userName: "",
          },
        },
      ],
      target: "",
      showClear: false,
    };
  }
  componentDidMount() {
    console.log(this.props.id);
    axios
      .get("http://localhost:8080/api/product/seller?id=" + this.props.id)
      .then((res) =>
        this.setState({
          products: res.data,
        })
      );
  }
  setTarget = (e) => {
    console.log(e.target.value);
    const { target } = this.state;
    const { value } = e.target;
    let clear = false;
    this.setState({ target: value });
    value.length > 0 && (clear = true);

    this.setState({ showClear: clear });
  };
  clearButton = () => {
    this.setState({
      target: "",
      showClear: false,
    });
  };
  render() {
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const { products, target, showClear } = this.state;
    console.log(this.state.showClear);
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
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => history.push("/admin/seller")}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <Input
                fullWidth
                placeholder="search..."
                onChange={(e) => this.setTarget(e)}
                value={target}
                endAdornment={
                  showClear && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.clearButton}
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
            <Button
              variant="contained"
              className={classes.buttonRed}
              size="small"
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          {products &&
            products.map((product, i) => (
              <Grid item xs={4} key={i} className={classes.margin}>
                <ProductCard product={product}></ProductCard>
              </Grid>
            ))}
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled page={12} onClick={this.changePage} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminSellerDetail);
