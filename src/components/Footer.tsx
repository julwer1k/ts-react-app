import { useContext } from 'react';
import { translate } from '../services/translate';
import { StateContext } from './Store';

export const Footer = () => {
	const { lang } = useContext(StateContext)

	return (
		<footer>
			{translate('footer.greating', lang)}
		</footer>
	);
}