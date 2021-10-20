import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import { updateObj } from '../util/helperFunctions.js';

const initialState = {
	user: null,
};

if (localStorage.getItem('bloggerToken')) {
	const decodedToken = jwtDecode(localStorage.getItem('bloggerToken'));

	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('bloggerToken');
	} else {
		initialState.user = decodedToken;
	}
}

const AuthContext = createContext(initialState);

const authReducer = (state, { type, userData }) => {
	switch (type) {
		case 'LOGIN':
			return updateObj(state, {
				user: userData,
			});
		case 'LOGOUT':
			return initialState;
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	// graphQL is managing auth-- if this runss, auth was already successful
	const login = (userData) => {
		localStorage.setItem('bloggerToken', userData.token);

		dispatch({ type: 'LOGIN', userData });
	};

	const logout = () => {
		localStorage.removeItem('bloggerToken');
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				logout,
				user: state.user,
			}}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
