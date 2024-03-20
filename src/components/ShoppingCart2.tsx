import React, { FC, useState } from 'react';
import { getMaxId } from '../services/order';
import type { IOrderItem } from '../types/IOrderItem';
import { OrderItemList } from './OrderItemList';

//region Props and State
type TShoppingCart = {
	name: string;
}

type State = {
	code: string;
	quantity: number
	orderItems: IOrderItem[];
}

//endregion

export class ShoppingCart2 extends React.PureComponent<TShoppingCart, State> {
	state = {
		code: '',
		quantity: 0,
		orderItems: [],
	};

	timerId = 0;
	handleDocumentRightClick = (event: MouseEvent) => {
		console.log(event.clientX);
	};

	// public shouldComponentUpdate(
	// 	nextProps: Readonly<TShoppingCart>,
	// 	nextState: Readonly<State>,
	// 	nextContext: any,
	// ): boolean {
	// 	return nextProps.name !== this.props.name;
	// }

	public componentDidMount(): void {
		this.timerId = window.setInterval(() => {}, 1000);
		document.addEventListener('contextmenu', this.handleDocumentRightClick)
		console.log('componentDidMount ShoppingCart2');
	}

	public componentDidUpdate(prevProps: Readonly<TShoppingCart>, prevState: Readonly<State>): void {
		if (prevProps.name !== this.props.name) {
			console.log('Loading data for', this.props.name);
		}
		console.log('componentDidUpdate ShoppingCart2');
	}

	public componentWillUnmount(): void {
		window.clearInterval(this.timerId);
		document.removeEventListener('contextmenu', this.handleDocumentRightClick);
		console.log('componentWillUnmount ShoppingCart2');
	}

	//region event handlers
	handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ code: event.target.value });
	};

	handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ quantity: +event.target.value });
	};

	handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		this.setState(current => {
			const { quantity, code, orderItems } = current;

			if (quantity <= 0 || !code) {
				return null;
			}


			const id = 1 + getMaxId(orderItems);
			const newItem = { id, code, quantity };

			return {
				orderItems: [...orderItems, newItem],
				quantity: 0,
				code: '',
			};
		});
	};

	//endregion

	render() {
		const { code, quantity, orderItems } = this.state;
		const { name } = this.props;

		const filteredItems = orderItems.filter(() => true);

		return (
			<div className="box">
				<h2 className="title is-5 mb-2">{name}</h2>

				<form onSubmit={this.handleSubmit} noValidate className="mb-4 field">
					<input
						className="input is-inline"
						type="text"
						placeholder="Enter code"
						value={code}
						onChange={this.handleCodeChange}
					/>

					<input
						className="input is-inline"
						type="number"
						min="1"
						max="9"
						value={quantity}
						onChange={this.handleQuantityChange}
					/>

					<button type="submit" className="button is-link">Add</button>
				</form>

				<OrderItemList items={filteredItems} />
			</div>
		);
	}
}