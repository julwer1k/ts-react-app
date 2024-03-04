import React, { useState } from 'react';
import type { Post } from './types/Post';
import postFromServer from './api/posts.json';
import { getUserById } from './services/user';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';

import '@fortawesome/fontawesome-free/css/all.css';

const initialPosts: Post[] = postFromServer.map(post => ({
	...post,
	user: getUserById(post.userId),
}));

function getNewPostId(posts: Post[]) {
	// return +Math.random().toFixed(12).slice(2);
	const maxId = Math.max(...posts.map(post => post.id));

	return maxId + 1;
}

export const App: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>(initialPosts);

	const addPost = ({ id, ...data }: Post) => {
		const newPost = {
			id: getNewPostId(posts),
			...data,
		};

		setPosts(currentPosts => [...currentPosts, newPost]);
	};

	return (
		<div className="section">
			<h1 className="title">Create a post</h1>

			<PostForm onSubmit={addPost} />
			<PostList posts={posts} />
		</div>
	);
};
