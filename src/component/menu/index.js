import { AppBar, BottomNavigation, BottomNavigationAction, Button, Grid, Link, MenuItem, MenuList, Toolbar, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { green, red } from "@material-ui/core/colors";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = (theme) => ({
	root: {
    '& > svg': {
      margin: theme.spacing(2),
			'&:hover': {
				backgroundColor: red[500],
				color: "white",
				cursor: "pointer"
			}
    },
  },
	menu :{
		color: green[500],
	}
});

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: [
				"profile",
				"My Account",
				"Admin menu"
			],
			value: 'recent',
		}
	}
	handleChange = (event, newValue) => {
		console.log(newValue);

		this.setState({
			value: newValue
		})
	};
	render() {
		let menu = []

		const { classes } = this.props;
		return (
			<>
				<Grid container alignItems="center" style={{color:green[500], backgroundColor:"grey"}} >
					<Grid item xs={9}>
						<BottomNavigation  value={this.state.value} onChange={this.handleChange}  style={{ color: green[500], backgroundColor:"grey"
					 }}>
							<BottomNavigationAction style={{color:green[500], backgroundColor:"grey"}} label="Beranda" value="beranda" icon={<HomeIcon className={classes.menu}/>} />
							<BottomNavigationAction style={{color:green[500], backgroundColor:"grey"}} label="Penjual" value="penjual" icon={<TrendingUpIcon className={classes.menu}/>} />
							<BottomNavigationAction style={{color:green[500], backgroundColor:"grey"}} label="Akun" value="akun" icon={<AccountBoxIcon className={classes.menu}/>} />
						</BottomNavigation>
					</Grid>
					<Grid item xs={3}>
						{/* <div className={classes.root}> */}
							<ExitToAppIcon color="secondary" ></ExitToAppIcon>
						{/* </div> */}
					</Grid>
				</Grid>
			</>
		);
	}
}

export default withStyles(useStyles)(Menu);