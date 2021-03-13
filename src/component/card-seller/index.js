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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import InboxIcon from "@material-ui/icons/Inbox";

const useStyles = () => ({
  root: {
    maxWidth: 245,
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
    };
  }
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    const {
      classes,
      onClick,
      user,
      setQty,
      idx,
      editQty,
      history,
    } = this.props;
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
          <Typography variant="subtitle2">{user.prodQty} Limit</Typography>
        </CardActions>
        <Dialog
          open={this.state.modal}
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
              <Grid item xs={4}>
                <TextField
                  autoFocus
                  size="small"
                  margin="dense"
                  id="name"
                  label="Limit"
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
                  autoFocus
                  size="small"
                  margin="dense"
                  id="name"
                  label="Active"
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
                  autoFocus
                  size="small"
                  margin="dense"
                  id="name"
                  label="Inactive"
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
            <Button onClick={this.toggleModal} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* <CardActions disableSpacing>
          <TextField
            label="Product"
            size="small"
            value={user.prodQty}
            name="prod"
            onChange={(e) => setQty(e, idx)}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={editQty}
          >
            Edit
          </Button>
        </CardActions> */}
      </Card>
    );
  }
}

export default withStyles(useStyles)(SellerCard);
