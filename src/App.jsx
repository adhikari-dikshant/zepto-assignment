import React, { useState, useEffect } from 'react';
import './App.css';

const ChipComponent = () => {
	const [items, setItems] = useState(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
	const [chips, setChips] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [isBackspacePressed, setIsBackspacePressed] = useState(false);

	useEffect(() => {
		if (isBackspacePressed && !inputValue && chips.length) {
			const lastChip = chips[chips.length - 1];
			setChips(chips.slice(0, -1));
			setItems([...items, lastChip]);
		}
		setIsBackspacePressed(false);
	}, [isBackspacePressed, inputValue, chips, items]);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleInputKey = (event) => {
		if (event.key === 'Enter' && inputValue) {
			event.preventDefault();
			const filteredItems = items.filter((item) =>
				item.toLowerCase().startsWith(inputValue.toLowerCase())
			);
			if (filteredItems.length > 0) {
				const matchedItem = filteredItems[0];
				setChips([...chips, matchedItem]);
				setItems(items.filter((item) => item !== matchedItem));
				setInputValue('');
			}
		} else if (event.key === 'Backspace' && !inputValue && chips.length) {
			setIsBackspacePressed(true);
		} else if (event.key === 'ArrowDown' && items.length > 0) {
			event.preventDefault();
			setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : (prevIndex + 1) % items.length));
		} else if (event.key === 'ArrowUp' && items.length > 0) {
			event.preventDefault();
			setFocusedIndex((prevIndex) => (prevIndex === null ? items.length - 1 : (prevIndex - 1 + items.length) % items.length));
		}
	};

	const handleItemClick = (item) => {
		setChips([...chips, item]);
		setItems(items.filter((i) => i !== item));
		setInputValue('');
	};

	const handleDeleteChip = (chip) => {
		setChips(chips.filter((c) => c !== chip));
		setItems([...items, chip]);
	};

	return (
		<div className="body">
			<div className="chip-component">
				<div className="chips">
					{chips.map((chip, index) => (
						<div key={index} className="chip">
							{chip}
							<button onClick={() => handleDeleteChip(chip)}>X</button>
						</div>
					))}
				</div>
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleInputKey}
					onFocus={() => setItems([...items])}
				/>
				<ul className="suggestions">
					{items.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase())).map((filteredItem, index) => (
						<li key={index} onClick={() => handleItemClick(filteredItem)}>
							{filteredItem}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ChipComponent;