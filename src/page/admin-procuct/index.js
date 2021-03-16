import {
  Box,
  Button,
  Collapse,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import {
  Menu,
  PaginationControlled,
  ProductCard,
  SearchField,
} from "../../component";
import FilterListIcon from "@material-ui/icons/FilterList";
import { red } from "@material-ui/core/colors";

const useStyles = () => ({
  margin: {
    marginBottom: "12px",
  },
  redOff: {
    color: red[500],
  },
  redOn: {
    color: red[200],
  },
});
class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [
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
      productPage: 0,
      filterSwitch: false,
    };
  }
  componentDidMount() {
    this.getAllProduct();
  }
  getAllProduct = () => {
    axios.get("http://localhost:8080/api/product").then((res) => {
      this.setState({ listProduct: res.data });
    });
  };
  countProduct = () => {};
  render() {
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const { listProduct, filterSwitch } = this.state;
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
        <Grid
          container
          item
          xs={12}
          justify="space-between"
          className={classes.margin}
        >
          <Grid item>
            <FilterListIcon
              style={{ cursor: "pointer" }}
              onClick={() => this.setState({ filterSwitch: !filterSwitch })}
              className={!filterSwitch ? classes.redOff : classes.redOn}
            ></FilterListIcon>
          </Grid>
          <Grid item>
            <SearchField></SearchField>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <Collapse in={filterSwitch}>
            <Paper elevation={4} className={classes.paper}>
              <Grid
                container
                xs={12}
                alignItems="center"
                direction="column"
                spacing={1}
              >
                <Grid container item direction="column" xs={4}>
                  <Button
                    variant="contained"
                    size="small"
                    color={true && "primary"}
                  >
                    Product Code
                  </Button>
                </Grid>
                <Grid container item direction="column" xs={4}>
                  <Button
                    variant="contained"
                    size="small"
                    color={true && "primary"}
                  >
                    Product Name
                  </Button>
                </Grid>
                <Grid container item direction="column" xs={4}>
                  <Button
                    variant="contained"
                    size="small"
                    color={true && "primary"}
                  >
                    Status
                  </Button>
                  <Select value="">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
                <Grid container item direction="column" xs={4}>
                  <Button
                    variant="contained"
                    size="small"
                    color={true && "primary"}
                  >
                    Date
                  </Button>
                </Grid>

                <Grid container item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <TextField type="date"></TextField>
                    <Box ml={2} mr={2}>
                      to
                    </Box>
                    <TextField type="date"></TextField>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Grid>
        <Grid container item xs={12} className={classes.margin}>
          {listProduct &&
            listProduct.map((prod, i) => (
              <Grid item xs={4} key={i}>
                <ProductCard product={prod}></ProductCard>
              </Grid>
            ))}
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled page={10}></PaginationControlled>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminProduct);
