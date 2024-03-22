import React, { useReducer } from 'react';
import { Lang } from '../types/Lang';

type Action = {
	type: 'decrease'
} | {
	type: 'increase'
} | {
	type: 'add',
	payload: number
} |
	{
		type: 'setLang',
		payload: Lang
	}

interface State {
	amount: number;
	lang: Lang;
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'setLang':
			return {
				...state,
				lang: action.payload,
			};
		case 'increase':
			return {
				...state,
				amount: state.amount + 1,
			};
		case 'decrease':
			return {
				...state,
				amount: state.amount - 1,
			};
		case 'add':
			return {
				...state,
				amount: state.amount + action.payload,
			};
		default:
			return state;
	}
}

const initialState: State = {
	amount: 0,
	lang: Lang.EN,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((action: Action) => {
});

type Props = {
	children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);


	return (
		<DispatchContext.Provider value={dispatch}>
			<StateContext.Provider value={state}>
				{children}
			</StateContext.Provider>
		</DispatchContext.Provider>
	);
};