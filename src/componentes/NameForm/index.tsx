import { useState, useRef } from 'react';
import { useAddParticipant } from '../../state/hooks/useAddParticipant';
import { useErrorMessage } from '../../state/hooks/useErrorMessage';

import './styles.css';

const NameForm = () => {
	const [name, setName] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	const addAtList = useAddParticipant();
	const errorMessage = useErrorMessage();

	const addParticipant = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addAtList(name);
		setName('');
		inputRef.current?.focus();
	};

	return (
		<form onSubmit={addParticipant}>
			<div className='grupo-input-btn'>
				<input
					ref={inputRef}
					value={name}
					onChange={(e) => setName(e.target.value)}
					type='text'
					placeholder='Insert the names of all participants'
				/>
				<button disabled={!name}>Add</button>
			</div>
			{errorMessage && <p role='alert'>{errorMessage}</p>}
		</form>
	);
};

export default NameForm;
