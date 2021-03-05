import { AppBar, BottomNavigation, BottomNavigationAction, Button, Grid, Link, MenuItem, MenuList, Toolbar, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { green, red } from "@material-ui/core/colors";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { connect } from 'react-redux';

const useStyles = (theme) => ({
	logout: {
		'&:hover': {
			backgroundColor: red[500],
			color: "white",
			cursor: "pointer"
		}
	},
	menu: {
		color: green[500],
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	button: {
		"&.focus": {
			color: 'black',
		}
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
	doLogout = () => {
		this.props.doLogout()
		this.props.history.push('/login')
	}
	render() {
		let menu = []
		console.log("isLOGIN in menu", this.props.isLogin);
		const { classes } = this.props;
		return (
			<>
				<AppBar position="static" style={{ color: red[500], backgroundColor: "white" }}>
					<Toolbar>
						<LocalMallIcon edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<MenuIcon />
						</LocalMallIcon>
						<Typography variant="h6" className={classes.title}>
							Gromart
    				</Typography>
						<Button color="inherit">Login</Button>
						<IconButton aria-label="show 4 new mails" color="inherit" active >
							<AccountBoxIcon style={{ color: green[500]}}  />
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<ExitToAppIcon />
						</IconButton>
						<IconButton
						>
							<AccountCircle />
						</IconButton>
					</Toolbar>
				</AppBar>
				{/* <Grid container alignItems="center" style={{ color: green[500], backgroundColor: "grey" }} >
					<Grid item xs={9}>
						<BottomNavigation value={this.state.value} onChange={this.handleChange} style={{
							color: green[500], backgroundColor: "grey"
						}}>
							<BottomNavigationAction style={{ color: green[500], backgroundColor: "grey" }} label="Beranda" value="beranda" icon={<HomeIcon className={classes.menu} />} />
							<BottomNavigationAction style={{ color: green[500], backgroundColor: "grey" }} label="Penjual" value="penjual" icon={<TrendingUpIcon className={classes.menu} />} />
							<BottomNavigationAction style={{ color: green[500], backgroundColor: "grey" }} label="Akun" value="akun" icon={<AccountBoxIcon className={classes.menu} />} />
						</BottomNavigation>
					</Grid>
					<Grid item xs={3}>
						<ExitToAppIcon color="secondary" className={classes.logout} onClick={this.doLogout}></ExitToAppIcon>
					</Grid>
				</Grid> */}
			</>
		);
	}
}
const mapStatToProps = (state) => {
	return ({
		isLogin: state.auth.isLogin
	})
}
const mapDispatchToProps = (dispatch) => {
	return ({
		doLogout: () => dispatch({ type: "LOGOUT" })
	})
}
export default connect(mapStatToProps, mapDispatchToProps)(withStyles(useStyles)(Menu));