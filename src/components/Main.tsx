import React, { FC, useContext } from 'react';
import { DispatchContext, StateContext } from './Store';

export const Main: FC = () => {
	const dispatch = useContext(DispatchContext);
	const { amount } = useContext(StateContext);
	const decrease = () => dispatch({ type: 'decrease' });
	const increase = () => dispatch({ type: 'increase' });
	return (
		<main>
			<button onClick={decrease}>-</button>
			{amount}
			<button onClick={increase}>+</button>
		</main>
	);
};