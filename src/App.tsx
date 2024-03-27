import React, { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { UsersList } from './components/UserList';
import { UserPosts } from './components/UserPost';
import { getUsers } from './services/user';
import { User } from './types';

export const App: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	//region loading, errorMessage, updateAt
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [updateAt, setUpdateAt] = useState(new Date());

	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			getUsers()
				.then(setUsers)
				.catch(() => setErrorMessage('Try again later'))
				.finally(() => setLoading(false));
		}, 1000);
	}, [updateAt]);

	function reload() {
		setUpdateAt(new Date());
		setErrorMessage('');
	}
	//endregion

	return (
		<div className="section py-5">
			<div className="box">
				<div className="title">Users</div>

				{loading && (
					<Loader />
				)}

				{!loading && users.length > 0 && (
					<UsersList users={users} onSelect={setSelectedUser} selectedUserId={selectedUser?.id}/>
				)}

				{!loading && !errorMessage && users.length === 0 && (
					<p className="title is-5">There are no users</p>
				)}

				{errorMessage && (
					<p className="notification is-danger">{errorMessage}
					<button onClick={reload}>Reload</button>
					</p>
				)}

				{selectedUser && (
					<UserPosts userId={selectedUser.id} />
				)}

			</div>
		</div>
	);
};