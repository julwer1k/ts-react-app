import React, { useCallback, useMemo, useState } from 'react';
import type { Post } from './types/Post';
import postFromServer from './api/posts.json';
import { getUserById } from './services/user';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';

import '@fortawesome/fontawesome-free/css/all.css';
import debounce from 'lodash.debounce'

/* function debounce(callback: Function, delay: number) {
 let timerId = 0;

 return (...args: any) => {
 window.clearTimeout(timerId)

 timerId = window.setTimeout(() => {
 callback(...args);
 }, delay);
 };
 } */

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
	const [query, setQuery] = useState('');
	const [appliedQuery, setAppliedQuery] = useState('');
	const [count, setCount] = useState(0);
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
		applyQuery(event.target.value);

		/* window.clearTimeout(timerId.current);
		 console.log('clear timeout', timerId.current);

		 timerId.current = window.setTimeout(() => {
		 console.log('Filtered by ' + event.target.value);

		 setAppliedQuery(event.target.value);
		 }, 1000);

		 console.log('set timeout ', timerId.current); */
	};

	const addPost = useCallback(({ id, ...data }: Post) => {
		setPosts(currentPosts => {
			const newPost = {
				id: getNewPostId(currentPosts),
				...data,
			};

			return [...currentPosts, newPost];
		});
	}, []);

	const deletePost = useCallback((postId: number) => {
		setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
	}, []);

	const filteredPosts = useMemo(() => {
		return posts.filter(posts => posts.title.includes(appliedQuery));
	}, [appliedQuery, posts]);

	const updatePost = useCallback((updatedPost: Post) => {
		setPosts(currentPosts => {
			const newPosts = [...currentPosts];
			const index = newPosts.findIndex(post => post.id === updatedPost.id);

			newPosts.splice(index, 1, updatedPost);

			return newPosts;
		});
	}, []);

	return (
		<div className="section py-5">
			<button onClick={() => setCount(prevState => prevState + 1)}>
				{count}
			</button>
			{selectedPost?.id}

			<div className="columns is-mobile">
				<div className="column">
					<h1 className="title">Posts</h1>
				</div>

				<div className="column">
					<input type="text" className="input is-rounded" value={query} onChange={handleQueryChange} />
				</div>
			</div>

			<PostList
				posts={filteredPosts}
				selectedPostId={selectedPost?.id}
				onDelete={deletePost}
				onSelect={setSelectedPost}
			/>

			{selectedPost ? (
				<PostForm
					onSubmit={updatePost}
					post={selectedPost}
					key={selectedPost.id}
					onReset={() => setSelectedPost(null)}
				/>
			) : (
				<PostForm onSubmit={addPost} />
			)}

		</div>
	);
};
