import React, { FC, useEffect, useRef, useState } from 'react';
import { getMaxId } from '../services/order';
import type { IOrderItem } from '../types/IOrderItem';
import { OrderItemList } from './OrderItemList';

type TShoppingCart = {
	name: string;
}

export const ShoppingCart: FC<TShoppingCart> = React.memo(({ name }) => {
	const [code, setCode] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

	const firstRender = useRef(true);

	useEffect(() => {
		const handleDocumentRightClick = (event: MouseEvent) => {
			console.log(event.clientX);
		};

		const timerId = window.setInterval(() => {
		}, 1000);
		document.addEventListener('contextmenu', handleDocumentRightClick);
		console.log('componentDidMount ShoppingCart');

		return () => {
			window.clearInterval(timerId);
			document.removeEventListener('contextmenu', handleDocumentRightClick);
			console.log('componentWillUnmount ShoppingCart');
		};
	}, []);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}

		console.log('Loading data for', name);
	}, [name]);

	//region handleChanges
	const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCode(event.target.value);
	};

	const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(+event.target.value);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (quantity <= 0 || !code) {
			return;
		}

		setOrderItems(items => {
			const id = 1 + getMaxId(items);
			const newItem = { id, code, quantity };

			return [...items, newItem];
		});

		setCode('');
		setQuantity(0);
	};
	//endregion

	const filteredItems = orderItems.filter(() => true);

	return (
		<div className="box">
			<h2 className="title is-5 mb-2">{name}</h2>

			<form onSubmit={handleSubmit} noValidate className="mb-4 field">
				<input
					className="input is-inline"
					type="text"
					placeholder="Enter code"
					value={code}
					onChange={handleCodeChange}
				/>

				<input
					className="input is-inline"
					type="number"
					min="1"
					max="9"
					value={quantity}
					onChange={handleQuantityChange}
				/>

				<button type="submit" className="button is-link">Add</button>
			</form>

			<OrderItemList items={filteredItems} />
		</div>
	);
});