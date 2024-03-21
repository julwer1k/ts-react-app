import { useReducer, useState } from 'react';

interface Action {
	type: string;
	payload?: number;
}

function reducer(amount: number, action: Action) {
	switch (action.type) {
		case 'decrease':
			return amount - 1;
		case 'increase':
			return amount + 1;

		case 'add':
			return amount + (action.payload || 0);
		default:
			return amount;
	}
}

export const App = () => {
	const [amount, dispatch] = useReducer(reducer, 3);

	const decrease = () => {
		// setAmount(x => x - 1);
		dispatch({ type: 'decrease' });
	};

	const increase = () => {
		// setAmount(x => x + 1);
		dispatch({ type: 'increase' });
		dispatch({ type: 'add', payload: 10 });
	};

	return (
		<main>
			<button onClick={decrease}>-</button>
			{amount}
			<button onClick={increase}>+</button>
		</main>
	);
};