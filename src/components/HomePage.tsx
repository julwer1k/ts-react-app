import React, { FC, useContext } from 'react';
import { translate } from '../services/translate';
import type { Lang } from '../types/Lang';
import { LangContext } from './LangContext';

type Props = {
}

export const HomePage: FC<Props> = () => {
	return (
		<div className="HomePage">
			<HomePageTitle />
			<HomePageContent />
		</div>
	);
};

const HomePageTitle: FC<Props> = () => {
	const { lang } = useContext(LangContext)

	return (
		<h1>{translate('homePage.title', lang)}</h1>
	);
};


const HomePageContent: FC<Props> = () => {
	const { lang } = useContext(LangContext)

	return (
		<section>{translate('homePage.content', lang)}</section>
	);
};