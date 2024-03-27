import type { User } from '../types';
import { getData } from '../utils/httpClient';

export function getUsers() {
	return getData<User[]>('/users.json').then(users => users.slice(0, 3)
		);
}