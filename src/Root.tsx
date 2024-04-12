import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { RequireAuth } from './components/RequireAuth';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NewPostPage } from './pages/NewPostPage';
import { PostDetailsPage } from './pages/PostDetailsPage';
import { PostsPage } from './pages/PostsPage';
import { UsersPage } from './pages/UsersPage';
import { AuthProvider } from './store/AuthContext';
import { PostsProvider } from './store/PostsContext';
import { UsersProvider } from './store/UsersContext';

export const Root = () => (
	<Router>
		<AuthProvider>
			<UsersProvider>
				<PostsProvider>
					<Routes>
						<Route path="/" element={<App />}>
							<Route index element={<HomePage />} />
							<Route path="login" element={<LoginPage />} />

							<Route path="users" element={<RequireAuth />}>
								<Route index element={<UsersPage />} />

								<Route path=":userId?/posts">
									<Route index element={<PostsPage />} />
									<Route path=":postId" element={<PostDetailsPage />} />
									<Route path="new" element={<NewPostPage />} />
								</Route>
							</Route>

							<Route path="posts">
								<Route index element={<PostsPage />} />
								<Route path=":postId" element={<PostDetailsPage />} />
								<Route path="new" element={<NewPostPage />} />
							</Route>

							<Route path="*" element={<p>Not found 404</p>} />
						</Route>
					</Routes>
				</PostsProvider>
			</UsersProvider>
		</AuthProvider>
	</Router>
);