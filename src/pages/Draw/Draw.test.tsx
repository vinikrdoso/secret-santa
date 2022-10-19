import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useDrawResult } from '../../state/hooks/useDrawResult';
import { useParticipantsList } from '../../state/hooks/useParticipantsList';
import Draw from './index';

jest.mock('../../state/hooks/useParticipantsList', () => {
	return {
		useParticipantsList: jest.fn(),
	};
});
jest.mock('../../state/hooks/useDrawResult', () => {
	return {
		useDrawResult: jest.fn(),
	};
});

describe('at draw page', () => {
	const participants = ['Vini', 'Alukardoso', 'Alukardashian'];
	const result = new Map([
		['Vini', 'Alukardoso'],
		['Alukardoso', 'Alukardashian'],
		['Alukardashian', 'Vini'],
	]);
	beforeEach(() => {
		(useParticipantsList as jest.Mock).mockReturnValue(participants);
		(useDrawResult as jest.Mock).mockReturnValue(result);
	});
	test('all participants can show they secret friend', () => {
		render(
			<RecoilRoot>
				<Draw />
			</RecoilRoot>
		);

		const options = screen.queryAllByRole('option');
		expect(options).toHaveLength(participants.length + 1);
	});
	test('the secret friend is shown when is requested', () => {
		render(
			<RecoilRoot>
				<Draw />
			</RecoilRoot>
		);

		const select = screen.getByPlaceholderText('Select your name');
		fireEvent.change(select, {
			target: {
				value: participants[0],
			},
		});

		const button = screen.getByRole('button');

		fireEvent.click(button);

		const secretFriend = screen.getByRole('alert');
		expect(secretFriend).toBeInTheDocument();
	});
});
