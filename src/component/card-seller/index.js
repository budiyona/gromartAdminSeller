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
});

class SellerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      summary: {
        active: 0,
        inactive: 0,
        all: 0,
        limit: 0,
      },
      currentLimit: 0,
    };
  }
  toggleModal = () => {
    this.getSellerSumary(this.props.user.userCode);
    this.setState({
      modal: !this.state.modal,
    });
  };

  getSellerSumary = (id) => {
    // console.log("iddd", id);
    axios
      .get("http://localhost:8080/api/product/seller-summary?id=" + id)
      .then((res) => {
        // console.log("dateget", res.data.limit);
        this.setState({
          summary: res.data,
        });
      });
  };
  changeLimit = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);

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
      onClick,
      user,
      history,
      idx,
      onChange,

    } = this.props;
    const { summary, modal, currentlimit } = this.state;
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {user.userName[0]}
            </Avatar>
          }
          title={user.userName}
          subheader={moment(user.createdDate).format("MMMM DD, YYYY")}
        />
        <CardMedia
          style={{ cursor: "pointer" }}
          className={classes.media}
          image={person}
          onClick={() => history.push("/admin/product/" + user.userCode)}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.userCode}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={onClick} aria-label="share">
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
          <IconButton onClick={this.toggleModal} aria-label="share">
            <InboxIcon className={classes.blue} />
          </IconButton>
          <Typography variant="subtitle2">Limit</Typography>
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
            <Button onClick={this.toggleModal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}

export default withStyles(useStyles)(SellerCard);
