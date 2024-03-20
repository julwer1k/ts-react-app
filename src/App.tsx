import { useState } from 'react';
import { ShoppingCart } from './components/ShoppingCart';

export const App = () => {
	const [query, setQuery] = useState('Hello');
	const [visible, setVisible] = useState(true);

	return (
		<div className="section pt-2">
			<div className="box">
				{visible ? (
					<button className="button" onClick={() => setVisible(false)}>Hide</button>
				) : (
					<button className="button" onClick={() => setVisible(true)}>Show</button>
				)}

				<input
					className="input is-inline ml-4"
					type="search"
					placeholder="Filter bv code"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>

			{visible && (
				<ShoppingCart name={query} />
			)}
		</div>
	);
}