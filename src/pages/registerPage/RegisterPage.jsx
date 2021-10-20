import React from 'react';
import * as style from '../pages.module.scss';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../../util/hooks';

export default function RegisterPage() {
	const { onChange, onSubmit, values } = useForm(handleOnSubmit, {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [addUser] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			console.log(userData);
		},
		variables: values,
	});

	function handleOnSubmit() {
		// console.log('submited', values);
		addUser();
	}

	return (
		<div className={style.PageContainer}>
			<Form onSubmit={onSubmit} noValidate>
				<h1>Register User</h1>
				<Form.Input
					onChange={onChange}
					value={values.displayName}
					placeholder='Enter Display Name'
					type='text'
					name='displayName'
				/>
				<Form.Input
					onChange={onChange}
					value={values.email}
					placeholder='Enter Email Addres'
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
				<Form.Input
					onChange={onChange}
					value={values.confirmPassword}
					placeholder='Confirm Password'
					type='password'
					name='confirmPassword'
				/>
				<Button type='submit' primary>
					Create User
				</Button>
			</Form>
		</div>
	);
}

const REGISTER_USER = gql`
	mutation register(
		$displayName: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				displayName: $displayName
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			displayName
			token
			createdAt
		}
	}
`;
