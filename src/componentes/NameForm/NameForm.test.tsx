import { fireEvent, render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import NameForm from './index';

describe('NameForm.tsx behavior', () => {
	test("when input is empty, new participants can't be added", () => {
		render(
			<RecoilRoot>
				<NameForm />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText(
			'Insert the names of all participants'
		);

		const button = screen.getByRole('button');

		expect(input).toBeInTheDocument();
		expect(button).toBeDisabled();
	});

	test('add a participant when input is filled', () => {
		render(
			<RecoilRoot>
				<NameForm />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText(
			'Insert the names of all participants'
		);

		const button = screen.getByRole('button');

		fireEvent.change(input, {
			target: {
				value: 'Vini',
			},
		});

		fireEvent.click(button);

		expect(input).toHaveFocus();
		expect(input).toHaveValue('');
	});

	test("duplicated names can't be added to the list", () => {
		render(
			<RecoilRoot>
				<NameForm />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText(
			'Insert the names of all participants'
		);

		const button = screen.getByRole('button');

		fireEvent.change(input, {
			target: {
				value: 'Vini',
			},
		});

		fireEvent.click(button);

		fireEvent.change(input, {
			target: {
				value: 'Vini',
			},
		});

		fireEvent.click(button);

		const errorMessage = screen.getByRole('alert');
		expect(errorMessage.textContent).toBe("Duplicated names aren't allowed");
	});

	test('message errors should disappear after timers', () => {
		jest.useFakeTimers();
		render(
			<RecoilRoot>
				<NameForm />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText(
			'Insert the names of all participants'
		);

		const button = screen.getByRole('button');

		fireEvent.change(input, {
			target: {
				value: 'Vini',
			},
		});

		fireEvent.click(button);

		fireEvent.change(input, {
			target: {
				value: 'Vini',
			},
		});

		fireEvent.click(button);

		let errorMessage = screen.queryByRole('alert');
		expect(errorMessage).toBeInTheDocument();

		act(() => {
			jest.runAllTimers();
		});

		errorMessage = screen.queryByRole('alert');
		expect(errorMessage).toBeNull();
	});
});
