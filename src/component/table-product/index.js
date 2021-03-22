import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import moment from "moment";
import React, { Component } from "react";
import "./style.css";
const useStyles = () => ({
  table: {
    // border: "1px solid black",
  },
});
class TableProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { rows } = this.state;
    console.log("rowwss", rows);
    const { classes, listProduct, page, user } = this.props;
    return (
      <>
        <div className="field">
          <h6 className="inline">REPORT ID </h6>
          <h6>: REPORT#{user.userCode} </h6>
        </div>
        <div className="field">
          <h6 className="inline">SELLER NAME </h6>
          <h6>: {user.fullName} </h6>
        </div>
        <div className="field">
          <h6 className="inline">DATE </h6>
          <h6>: {moment(Date()).format("YYYY-MM-DD, H:mm:ss")} </h6>
        </div>
        <div className="field">
          <h6 className="inline">PAGE </h6>
          <h6>
            : {page.pageNow} of {page.pageTotal}
          </h6>
        </div>
        {/* <hr /> */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.length > 0 &&
              listProduct.map((product, key) => {
                // console.log(row);
                return (
                  <tr key={key}>
                    <td component="th" scope="row">
                      {key + 1}
                    </td>
                    <td>{product.productCode}</td>
                    <td>{product.productName}</td>
                    <td align="right">{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.status}</td>
                    <td>{product.createdDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
    // return (
    //   <TableContainer component={Paper}>
    //     <Table
    //       className={classes.table}
    //       size="small"
    //       aria-label="a dense table"
    //     >
    //       <caption>
    //         page {page.pageNow} of {page.pageTotal} (
    //         {moment(Date()).format("YYYY-MM-DD, H:mm:ss")})
    //       </caption>
    //       <TableHead>
    //         <TableRow>
    //           <TableCell> # </TableCell>
    //           <TableCell> Code </TableCell>
    //           <TableCell> Name </TableCell>
    //           <TableCell align="right">Price</TableCell>
    //           <TableCell>Description</TableCell>
    //           <TableCell>Status</TableCell>
    //           <TableCell>Created Date</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {listProduct.length > 0 &&
    //           listProduct.map((product, key) => {
    //             // console.log(row);
    //             return (
    //               <TableRow key={key}>
    //                 <TableCell component="th" scope="row">
    //                   {key + 1}
    //                 </TableCell>
    //                 <TableCell>{product.productCode}</TableCell>
    //                 <TableCell>{product.productName}</TableCell>
    //                 <TableCell align="right">{product.price}</TableCell>
    //                 <TableCell>{product.description}</TableCell>
    //                 <TableCell>{product.status}</TableCell>
    //                 <TableCell>{product.createdDate}</TableCell>
    //               </TableRow>
    //             );
    //           })}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // );
  }
}

export default withStyles(useStyles)(TableProduct);
