import React, { Component } from 'react';
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	Link,
	TextField,
	Typography
} from '@material-ui/core';

import { withStyles } from "@material-ui/core/styles";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Copyright } from '../../component';
const useStyles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		const { classes } = this.props;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
        </Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="phone"
									label="phone"
									name="phone"
									autoComplete="phone"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</Grid>

						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Register
          </Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Login
              </Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}>
					<Copyright></Copyright>
				</Box>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Register);