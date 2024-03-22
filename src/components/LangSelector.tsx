import React, { useContext } from 'react';
import { Lang } from '../types/Lang';
import { DispatchContext, StateContext } from './Store';

type Props = {};

export const LangSelector: React.FC<Props> = () => {
	const dispatch = useContext(DispatchContext);
	const { lang } = useContext(StateContext);

	return (
		<select
			value={lang}
			onChange={event => {
				dispatch({
					payload: event.target.value as Lang,
					type: 'setLang',
				});
			}}
		>
			<option value={Lang.EN}>English</option>
			<option value={Lang.UA}>Українська</option>
		</select>
	);
};