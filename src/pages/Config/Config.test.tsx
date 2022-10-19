import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Config from './index';

const mockNavigation = jest.fn();
jest.mock('react-router-dom', () => {
	return {
		useNavigate: () => mockNavigation,
	};
});

describe('Config page', () => {
	test('should render', () => {
		const { container } = render(
			<RecoilRoot>
				<Config />
			</RecoilRoot>
		);

		expect(container).toMatchSnapshot();
	});
});
