import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

export const LoginPage: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { login } = useContext(AuthContext);

	const navigate = useNavigate();
	const { state } = useLocation();

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setErrorMessage('');

		login(username, password)
			.then(() => {
				navigate(state?.pathname || '/', { replace: true });
			})
			.catch(error => setErrorMessage(error.message));
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button type="submit">Sign in</button>
		</form>
	);
};