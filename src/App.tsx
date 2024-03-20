import React from 'react';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { LangProvider } from './components/LangContext';
import { LangSelector } from './components/LangSelector';

export const App = () => {

	return (
		<div className="App">
			<LangProvider>
				<header className="header">
					Mate academy

					<LangSelector />
				</header>

				<main>
					<HomePage />
				</main>

				<Footer />
			</LangProvider>
		</div>
	);
};