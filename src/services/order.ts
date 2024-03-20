import { IOrderItem } from '../types/IOrderItem';

export function getMaxId(items: IOrderItem[]) {
	return Math.max(0, ...items.map(item => item.id));
}