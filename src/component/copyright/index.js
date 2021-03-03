import { Link, Typography } from '@material-ui/core';
import React, { Component } from 'react';

class Copyright extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://material-ui.com/">
					Your Website
        </Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}
}

export default Copyright;