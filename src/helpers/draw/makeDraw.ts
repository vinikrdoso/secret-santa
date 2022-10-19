import shuffle from 'just-shuffle';

export function makeDraw(participants: string[]) {
	const participantsTotal = participants.length;
	const shuffledParticipants = shuffle(participants);
	const result = new Map<string, string>();
	for (let i = 0; i < participantsTotal; i++) {
		const nextFriendIndex = i + 1;
		const friendIndex = i === participantsTotal - 1 ? 0 : nextFriendIndex;
		result.set(shuffledParticipants[i], shuffledParticipants[friendIndex]);
	}

	return result;
}
