import React, { useContext } from 'react';
import * as style from '../pages.module.scss';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';

import { useForm } from '../../util/hooks';

export default function LoginPage(props) {
	const { login } = useContext(AuthContext);

	const { onChange, onSubmit, values } = useForm(handleOnSubmit, {
		email: '',
		password: '',
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			console.log('returned login and ran function');
			login(userData);
			props.history.push('/add-blog');
		},
		variables: values,
	});

	function handleOnSubmit() {
		// console.log('submited', values);
		loginUser();
	}

	return (
		<div className={style.PageContainer}>
			{loading ? (
				<p>...Loading</p>
			) : (
				<Form onSubmit={onSubmit} noValidate>
					<h1>Login User</h1>

					<Form.Input
						onChange={onChange}
						value={values.email}
						placeholder='Enter Email Address'
						type='email'
						name='email'
					/>
					<Form.Input
						onChange={onChange}
						value={values.password}
						placeholder='Enter Password'
						type='password'
						name='password'
					/>
					<Button type='submit' primary>
						Login
					</Button>
				</Form>
			)}
		</div>
	);
}

const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(loginInput: { email: $email, password: $password }) {
			id
			token
		}
	}
`;
