import moment from "moment";
import React, { Component } from "react";
import "./style.css";
import { formatToRupiah } from "../../util";

class TableProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { listProduct, page, user } = this.props;
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
                return (
                  <tr key={key}>
                    <td className="index-number">{key + 1}</td>
                    <td className="code">{product.productCode}</td>
                    <td className="name">{product.productName}</td>
                    <td className="price">{formatToRupiah(product.price)}</td>
                    <td className="description">{product.description}</td>
                    <td className="status">{product.status}</td>
                    <td>{product.createdDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}

export default TableProduct;
