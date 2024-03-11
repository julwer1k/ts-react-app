import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import usersFromServer from '../api/users.json';
import { getUserById } from '../services/user';
import type { Post } from '../types/Post';

type Props = {
	onSubmit: (post: Post) => void;
	onReset?: () => void;
	post?: Post;
}

export const PostForm: React.FC<Props> = ({
	onSubmit,
	post,
	onReset = () => {
	},
}) => {
	const titleField = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		if (titleField.current && post) {
			titleField.current.focus();
		}
	}, [post?.id]);

	//region UseStates
	const [title, setTitle] = useState(post?.title || '');
	const [hasTitleError, setHasTitleError] = useState(false);

	const [userId, setUserId] = useState(post?.userId || 0);
	const [hasUserIdError, setHasUserIdError] = useState(false);

	const [body, setBody] = useState(post?.body || '');
	const [bodyErrorMessage, setBodyErrorMessage] = useState('');
	//endregion

	//region HandlesChanges
	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
		setHasTitleError(false);
	};

	const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setUserId(+event.target.value);
		setHasUserIdError(false);
	};

	const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBody(event.target.value);
		setBodyErrorMessage('');
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		setHasTitleError(!title);
		setHasUserIdError(!userId);

		if (!body) {
			setBodyErrorMessage('Please enter some text');
		} else if (body.length < 5) {
			setBodyErrorMessage('Body should be at least 5 characters');
		}

		if (!title || !userId || !body || body.length < 5) {
			return;
		}

		onSubmit({
			id: post?.id || 0,
			title,
			body,
			userId,
			user: getUserById(userId),
		});

		reset();
	};
	//endregion

	const reset = () => {
		setTitle('');
		setBody('');
		setUserId(0);

		setHasTitleError(false);
		setHasUserIdError(false);
		setBodyErrorMessage('');

		onReset();
	};

	return (
		<form
			action="/api/posts"
			method="POST"
			className="box"
			onSubmit={handleSubmit}
			onReset={reset}
		>
			<div className="field">
				<label className="label" htmlFor="post-title">Title</label>

				<div
					className={classNames('control', {
						'has-icons-right': hasTitleError,
					})}
				>
					<input
						id="post-title"
						ref={titleField}
						className={classNames('input', {
							'is-danger': hasTitleError,
						})}
						type="text"
						placeholder="Email input"
						value={title}
						onChange={handleTitleChange}
						onBlur={() => {
							setHasTitleError(!title);
						}}
					/>

					{hasTitleError && (
						<span className="icon is-small is-right"><i className="fas fa-exclamation-triangle has-text-danger"></i></span>
					)}

					{hasTitleError && (
						<p className="help is-danger">Title is required</p>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label" htmlFor="post-user-id">Subject</label>
				<div className="control has-icons-left">
					<div
						className={classNames('select', {
							'is-danger': hasUserIdError,
						})}
					>
						<select
							id="post-user-id"
							value={userId}
							onChange={handleUserIdChange}
						>
							<option value="0">Select a user</option>
							{usersFromServer.map(user => (
								<option value={user.id} key={user.id}>
									{user.name}
								</option>
							))}
						</select>
					</div>
					<span className="icon is-small is-left"><i className="fas fa-user"></i></span>
				</div>

				{hasUserIdError && (
					<p className="help is-danger">Please select a user</p>
				)}
			</div>

			<div className="field">
				<label className="label">Message</label>
				<div className="control">
					<textarea
						className={classNames('textarea', {
							'is-danger': bodyErrorMessage,
						})}
						placeholder="Add some text here"
						value={body}
						onChange={handleBodyChange}
					></textarea>
				</div>

				{bodyErrorMessage && (
					<p className="help is-danger">{bodyErrorMessage}</p>
				)}
			</div>

			<div className="buttons">
				<button
					className="button is-link"
					type="submit"
				>
					Submit
				</button>
				<button
					className="button is-link is-light"
					type="reset"
				>
					Cancel
				</button>
			</div>
		</form>
	);
};
