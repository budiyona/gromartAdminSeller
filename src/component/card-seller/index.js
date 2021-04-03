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
import person from "../../static/person.jpg";
import moment from "moment";
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import axios from "axios";

const useStyles = () => ({
  root: {
    maxWidth: 275,
    fontSize: 1,
  },
  media: {
    height: 0,
    paddingTop: "45.25%", // 16:9
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
    // backgroundColor: "black"
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
    const { summary } = this.state;
    editQty(idx, summary.active);
    this.toggleModal();
  };

  render() {
    const {
      classes,
      toggleStatus,
      user,
      history,
      idx,
      onChange,
      rejectSeller,
    } = this.props;
    const { summary, modal, currentlimit, modalApproval } = this.state;
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
          onClick={() => history.push("/admin/product/" + user.userCode)}
        />

        <CardActions disableSpacing>
          <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
            {/* <IconButton onClick={onClick} aria-label="share" size="small"> */}
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
                onClick={() => this.toggleModal("modal")}
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
                  value={currentlimit}
                  size="small"
                  margin="dense"
                  name="currentlimit"
                  label="Limit"
                  type="number"
                  fullWidth
                  onChange={(e) => onChange(e, idx)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  value={summary.active}
                  autoFocus
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
                  autoFocus
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
                  autoFocus
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
            <Button onClick={() => this.toggleModal("modal")} color="primary">
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
