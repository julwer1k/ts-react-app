import type { Post } from '../types';
import { getData } from '../utils/httpClient';

export function getUserPost(userId: number) {
	return getData<Post[]>('/posts.json')
		.then(posts => posts.filter(
			post => post.userId === userId,
		));
}