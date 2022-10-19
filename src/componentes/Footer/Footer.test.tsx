import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useParticipantsList } from '../../state/hooks/useParticipantsList';
import Footer from '../Footer';

jest.mock('../../state/hooks/useParticipantsList', () => {
	return {
		useParticipantsList: jest.fn(),
	};
});

const mockNavigation = jest.fn();
jest.mock('react-router-dom', () => {
	return {
		useNavigate: () => mockNavigation,
	};
});

const mockDraw = jest.fn();
jest.mock('../../state/hooks/useDraw', () => {
	return {
		useDraw: () => mockDraw,
	};
});

describe('not enough participants', () => {
	beforeEach(() => {
		(useParticipantsList as jest.Mock).mockReturnValue([]);
	});
	test("game can't be started", () => {
		render(
			<RecoilRoot>
				<Footer />
			</RecoilRoot>
		);

		const button = screen.getByRole('button');

		expect(button).toBeDisabled();
	});
});

describe('enough participants', () => {
	const participants = ['Vini', 'Alukardoso', 'Alukardashian'];
	beforeEach(() => {
		(useParticipantsList as jest.Mock).mockReturnValue(participants);
	});

	test('game can be started', () => {
		render(
			<RecoilRoot>
				<Footer />
			</RecoilRoot>
		);

		const button = screen.getByRole('button');

		expect(button).not.toBeDisabled();
	});

	test('game was started', () => {
		render(
			<RecoilRoot>
				<Footer />
			</RecoilRoot>
		);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(mockNavigation).toHaveBeenCalledTimes(1);
		expect(mockNavigation).toHaveBeenCalledWith('/draw');
		expect(mockDraw).toHaveBeenCalledTimes(1);
	});
});
