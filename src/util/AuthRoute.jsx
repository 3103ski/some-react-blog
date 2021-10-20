import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context//auth';

export default function AuthRoute({ path, component: Component, ...rest }) {
	const { user } = useContext(AuthContext);

	return (
		<Route
			render={(props) => {
				if (!user) {
					localStorage.removeItem('bloggerToken');
				}
				return !user ? <Redirect to='/login' /> : <Component {...props} />;
			}}
		/>
	);
}
