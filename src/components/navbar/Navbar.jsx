import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

export default class MenuExampleInvertedSecondary extends Component {
	state = { activeItem: 'blogs' };

	handleItemClick = (_, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		return (
			<Segment inverted>
				<Menu inverted pointing secondary>
					<Menu.Item
						onClick={(e) => this.handleItemClick(e, { name: 'blogs' })}
						name='Blogs'
						active={activeItem === 'blogs'}
						as={Link}
						to='/'
					/>
					<Menu.Item
						onClick={(e) => this.handleItemClick(e, { name: 'login' })}
						name='Login'
						active={activeItem === 'login'}
						as={Link}
						to='/login'
					/>
					<Menu.Item
						onClick={(e) => this.handleItemClick(e, { name: 'signup' })}
						name='Sign Up'
						active={activeItem === 'signup'}
						as={Link}
						to='/register'
					/>
				</Menu>
			</Segment>
		);
	}
}
