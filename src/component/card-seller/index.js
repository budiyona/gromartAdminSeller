import {
  Card,
  Button,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { blue, green, red } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
import person from "../../static/person.jpg";
import moment from "moment";
import InboxIcon from "@material-ui/icons/Inbox";
import axios from "axios";

const useStyles = () => ({
  root: {
    maxWidth: 275,
    fontSize: 1,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "40.25%",
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
  miniPadding: {
    padding: 12,
  },
});

class SellerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalApproval: false,
      summary: {
        active: 0,
        inactive: 0,
        all: 0,
        limit: 0,
      },
      currentLimit: 0,
    };
  }
  toggleModal = (modalName) => {
    console.log(modalName, "modal");
    this.setState({
      [modalName]: !this.state[modalName],
    });
  };

  getSellerSumary = (id) => {
    axios
      .get("http://localhost:8080/api/product/seller-summary?id=" + id)
      .then((res) => {
        this.setState({
          summary: res.data,
        });
      });
  };
  changeLimit = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  saveEdit = () => {
    const { idx, editQty } = this.props;
    const { summary, currentLimit } = this.state;
    editQty(idx, summary.active, currentLimit);
    this.toggleModal("modal");
    this.resetLimit();
  };
  resetLimit = () => {
    this.setState({
      currentLimit: 0,
    });
  };
  render() {
    const {
      classes,
      toggleStatus,
      user,
      history,
      idx,
      rejectSeller,
    } = this.props;
    const { summary, modal, currentLimit, modalApproval } = this.state;
    return (
      <Card className={classes.root}>
        <CardHeader
          className={classes.miniPadding}
          title={user.userName}
          subheader={
            user.userCode +
            " (" +
            moment(user.createdDate).format("MMMM DD, YYYY") +
            ")"
          }
        />

        <CardMedia
          style={{ cursor: "pointer" }}
          className={classes.media}
          image={person}
          onClick={() => history.push("/admin/seller/product/" + user.userCode)}
        />

        <CardActions disableSpacing>
          <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
            <IconButton
              onClick={
                user.status === "requested"
                  ? () => this.toggleModal("modalApproval")
                  : () => toggleStatus(idx)
              }
              aria-label="share"
              size="small"
            >
              <DoneIcon
                className={
                  user.status === "active"
                    ? classes.green
                    : user.status === "inactive"
                    ? classes.red
                    : classes.blue
                }
              />
            </IconButton>
            <Typography variant="subtitle2">{user.status}</Typography>
          </div>
          {user.status !== "requested" && (
            <div
              style={{ display: "flex", alignItems: "center", width: "50%" }}
            >
              <IconButton
                onClick={() => {
                  this.getSellerSumary(user.userCode);
                  this.toggleModal("modal");
                }}
                aria-label="share"
                size="small"
              >
                <InboxIcon className={classes.blue} />
              </IconButton>
              <Typography variant="subtitle2">Limit</Typography>
            </div>
          )}
        </CardActions>
        <Dialog
          open={modal}
          onClose={() => {
            this.setState({ modal: false });
            this.resetLimit();
          }}
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
        >
          <DialogTitle id="form-dialog-title">Seller Limit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update Limit based on active product
            </DialogContentText>
            <Grid container xs={12} spacing={3}>
              <Grid item xs={3}>
                <TextField
                  value={currentLimit}
                  size="small"
                  margin="dense"
                  name="currentLimit"
                  label="Limit"
                  type="number"
                  fullWidth
                  onChange={(e) => this.changeLimit(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  value={summary.active}
                  size="small"
                  margin="dense"
                  label="Active"
                  type="text"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled
                  value={summary.inactive}
                  size="small"
                  margin="dense"
                  label="Inactive"
                  type="text"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  disabled
                  value={summary.limit}
                  size="small"
                  margin="dense"
                  label="current limit"
                  type="text"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.toggleModal("modal");
                this.resetLimit();
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={this.saveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={modalApproval}
          onClose={() => {
            this.setState({
              modalApproval: false,
            });
          }}
        >
          <DialogTitle>Approval</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to approve {user.userName} as seller
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                toggleStatus(idx);
                this.toggleModal("modalApproval");
              }}
            >
              Yes
            </Button>

            <Button
              color="secondary"
              onClick={() => {
                rejectSeller(user.userCode);
                this.toggleModal("modalApproval");
              }}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}

export default withStyles(useStyles)(SellerCard);
