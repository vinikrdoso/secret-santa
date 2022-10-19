import { useParticipantsList } from './useParticipantsList';

import { useSetRecoilState } from 'recoil';
import { secretFriendResult } from '../atom';

import { makeDraw } from '../../helpers/draw/makeDraw';

export const useDraw = () => {
	const participants = useParticipantsList();

	const setResult = useSetRecoilState(secretFriendResult);

	return () => {
		const result = makeDraw(participants);
		setResult(result);
	};
};
