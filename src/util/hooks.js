import { useState } from 'react';

export const useForm = (callback, inititalState = {}) => {
	const [values, setValues] = useState(inititalState);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};
