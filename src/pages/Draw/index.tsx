import { useState } from 'react';
import Card from '../../componentes/Card';
import { useDrawResult } from '../../state/hooks/useDrawResult';
import { useParticipantsList } from '../../state/hooks/useParticipantsList';

import './styles.css';

const Draw = () => {
	const [participant, setParticipant] = useState('');
	const [secretFriend, setSecretFriend] = useState('');
	const participants = useParticipantsList();
	const drawResult = useDrawResult();

	const draw = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (drawResult.has(participant))
			setSecretFriend(drawResult.get(participant)!);
	};

	return (
		<Card>
			<section className='draw'>
				<h2>Draw paper</h2>
				<form onSubmit={(event) => draw(event)}>
					<select
						required
						name='participant'
						id='participant'
						placeholder='Select your name'
						value={participant}
						onChange={(e) => setParticipant(e.target.value)}
					>
						<option>Select your name</option>
						{participants.map((participantItem) => (
							<option key={participantItem}>{participantItem}</option>
						))}
					</select>
					<p>Clique em em sortear para ver quem é seu amigo secreto!</p>
					<button className='draw-button'>Draw</button>
				</form>
				{secretFriend && <p role='alert'>{secretFriend}</p>}
				<footer className='draw'>
					<img
						src='/images/aviao.png'
						className='aviao'
						alt='Um desenho de um avião de papel'
					/>
				</footer>
			</section>
		</Card>
	);
};

export default Draw;
