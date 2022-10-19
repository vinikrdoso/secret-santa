import { makeDraw } from '../../helpers/draw/makeDraw';

describe('an secret friend draw', () => {
	test('each participant do not draw its own name', () => {
		const participants = ['vini', 'luna', 'alukard', 'leona', 'helena'];

		const draw = makeDraw(participants);

		participants.forEach((participant) => {
			const secretFriend = draw.get(participant);
			expect(secretFriend).not.toEqual(participant);
		});
	});
});
