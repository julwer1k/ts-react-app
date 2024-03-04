import React from 'react';
import type { Post } from '../types/Post';

type Props = {
	posts: Post[];
}

export const PostList: React.FC<Props> = ({ posts }) => {
	return (
		<table className="box table is-stroped is-narrow">
			<thead>
			<tr className="has-background-link-light">
				<th>#</th>
				<th>Title</th>
				<th>User</th>
			</tr>
			</thead>

			<tbody>
			{posts.map(post => (
				<tr key={post.id}>
					<td>{post.id}</td>
					<td>{post.title}</td>
					<td>{post.user?.email}</td>
				</tr>
			))}
			</tbody>
		</table>
	);
};

