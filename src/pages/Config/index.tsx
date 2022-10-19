import Card from '../../componentes/Card';
import Footer from '../../componentes/Footer';
import NameForm from '../../componentes/NameForm';
import ParticipantsList from '../../componentes/ParticipantsList';

import './styles.css';

const Config = () => {
	return (
		<Card>
			<section>
				<h2>Let's begin!</h2>
				<NameForm />
				<ParticipantsList />
				<Footer />
			</section>
		</Card>
	);
};

export default Config;
