import { User } from '../types';
import { client } from '../utils/httpClient';

export function getUsers() {
	return client.get<User[]>('/users')
		.then(users => users.slice(0, 11))
		.catch(error => console.log(error))
		.finally(() => console.log('finally'))
}

export async function getUsers2() {
	try {
		const users = await client.get<User[]>('/users');
		return users.slice(0, 11);
	} catch (error) {
		console.log(error)
	} finally {
		console.log('finally')
	}
}

export const getUsers3 = async() => {

	const [users, posts] = await Promise.all([
		client.get<User[]>('/users'),
		client.get<User[]>('/posts'),
	])

	return users.slice(0, 11);
}