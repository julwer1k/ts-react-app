import React from 'react';
import type { IOrderItem } from '../types/IOrderItem';

type Props = {
	items: IOrderItem[];
};

export const OrderItemList: React.FC<Props> = ({ items }) => {
	if (items.length === 0) {
		return (
			<p>No items yet</p>
		);
	}

	return (
		<ul>
			{items.map(item => (
				<li key={item.id}>
					{item.code} - {item.quantity}
				</li>
			))}
		</ul>
	);
}