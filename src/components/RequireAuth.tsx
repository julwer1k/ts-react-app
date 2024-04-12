import React, { FC, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

export const RequireAuth: FC = () => {
	const { authorized } = useContext(AuthContext);
	const { pathname } = useLocation();
	
	if (!authorized) {
		return <Navigate to={'/login'} state={{ pathname }} replace/>;
	}

	return (
		<Outlet />
	);
};