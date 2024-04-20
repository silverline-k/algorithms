// Lv.2 게임 맵 최단거리
// 지나가야 하는 칸 개수 최솟값 구하기 (도착 할 수 없을 경우 -1 리턴)
function solution(maps) {
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
