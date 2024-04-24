// Lv.2 게임 맵 최단거리
// 지나가야 하는 칸 개수 최솟값 구하기 (도착 할 수 없을 경우 -1 리턴)
function solution1(maps) {
	const height = maps.length - 1;
	const width = maps[0].length - 1;

	// 상하좌우 순서
	const dx = [0, 0, 1, -1];
	const dy = [-1, 1, 0, 0];

	const visited = new Set();
	const queue = [[0, 0, 1]];

	while (queue.length) {
		const [x, y, count] = queue.shift();

		if (x === width && y === height) {
			return count;
		}

		if (visited.has(`${x},${y}`)) {
			continue;
		} else {
			visited.add(`${x},${y}`);
		}

		for (let i = 0; i < 4; i++) {
			const nx = x + dx[i];
			const ny = y + dy[i];
			if (nx >= 0 && ny >= 0 && nx <= width && ny <= height && maps[ny][nx]) {
				queue.push([nx, ny, count + 1]);
			}
		}
	}

	return -1;
}

// Lv.3 단어 변환
// words안에 target 없는 경우 return 0 해줘야 함
function solution(begin, target, words) {
	let answer = 0;

	const checked = new Set();

	let queue = [[begin, 0]];
	while (queue.length) {
		const [word, count] = queue.shift();

		if (!checked.has(word)) {
			if (word === target) {
				queue = [];
				checked.add(word);
				answer = count;
			} else {
				for (let i = 0; i < words.length; i++) {
					if (checkWord(word, words[i])) {
						checked.add(word);
						queue.push([words[i], count + 1]);
					}
				}
			}

		}
	}

	if (!checked.has(target)) answer = 0;

	return answer;
}
function checkWord(word1, word2) {
	let count = 0;
	for (let i = 0; i < word1.length; i++) {
		if (word1[i] !== word2[i]) count++;
	}

	// 1개의 동일한 자리에 알파벳 다른 경우 단어 바꿀 수 있음
	return count === 1;
};
