import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useParticipantsList } from '../../state/hooks/useParticipantsList';
import ParticipantsList from './index';

jest.mock('../../state/hooks/useParticipantsList', () => {
	return {
		useParticipantsList: jest.fn(),
	};
});

describe('an empty list of participants', () => {
	beforeEach(() => {
		(useParticipantsList as jest.Mock).mockReturnValue([]);
	});
	test('should render an empty list of participants', () => {
		render(
			<RecoilRoot>
				<ParticipantsList />
			</RecoilRoot>
		);

		const itens = screen.queryAllByRole('listItem');
		expect(itens).toHaveLength(0);
	});
});

describe('an filled list of participants', () => {
	const participants = ['Vini', 'Alukardoso'];
	beforeEach(() => {
		(useParticipantsList as jest.Mock).mockReturnValue(participants);
	});
	test('should render a list of 2 participants', () => {
		render(
			<RecoilRoot>
				<ParticipantsList />
			</RecoilRoot>
		);

		const itens = screen.queryAllByRole('listitem');
		expect(itens).toHaveLength(participants.length);
	});
});
