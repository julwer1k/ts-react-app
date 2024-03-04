import usersFromServer from '../api/users.json';
import type { User } from '../types/User';

export function getUserById(userId: number): User | null {
	return usersFromServer.find(user => user.id === userId)
		|| null;
}