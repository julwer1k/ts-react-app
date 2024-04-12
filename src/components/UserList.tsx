import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { User } from '../types';

type Props = {
	users: User[];
};

export const UsersList: React.FC<Props> = ({
	users,
}) => {
	const { userId } = useParams();
	const selectedUserId = userId ? +userId : 0;

	return (
		<table className="table is-narrow">
			<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Email</th>
				<th></th>
			</tr>
			</thead>

			<tbody>
			{users.map(user => (
				<tr
					key={user.id}
					className={classNames({
						'has-background-warning': selectedUserId === user.id,
					})}
				>
					<td>{user.id}</td>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>
						{user.id === selectedUserId
							? (
								<Link
									to='..'
									className="icon button is-success"
								>
									<i className="far fa-eye-slash" />
								</Link>
							)
							: (
								<Link
									to={`${user.id}/posts`}
									className="icon button is-success is-inverted"
								>
									<i className="far fa-eye" />
								</Link>
							)}
					</td>
				</tr>))}
			</tbody>
		</table>
	);
};