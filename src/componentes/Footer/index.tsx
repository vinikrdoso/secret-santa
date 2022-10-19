import { useNavigate } from 'react-router-dom';
import { useDraw } from '../../state/hooks/useDraw';
import { useParticipantsList } from '../../state/hooks/useParticipantsList';

import './styles.css';

const Footer = () => {
	const participants = useParticipantsList();

	const navigate = useNavigate();
	const draw = useDraw();

	const startGame = () => {
		draw();
		navigate('/draw');
	};
	return (
		<footer className='footer-configs'>
			<button
				className='button'
				disabled={participants.length < 3}
				onClick={startGame}
			>
				Start game
			</button>
			<img src='/images/sacolas.png' alt='Sacolas de compras' />
		</footer>
	);
};

export default Footer;
