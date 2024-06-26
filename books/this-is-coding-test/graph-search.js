import { runTest } from "../../test-helper.js";

/**
 * 문제: 음료수 얼려 먹기 (난이도 1.5/3)
 * 내 풀이:
 *   - bfs로 풀면 된다고 생각했음, 0,0 부터 시작할 수 있도록 큐에 넣고 상하좌우 탐색해서 1일 때
 *     가로, 세로 + 1 한 값이 n 또는 m 보다 작으면 그 다음에 있는 값 큐에 넣고 다시 탐색하면 될 거라고 생각했음
 *   - 문제를 제대로 이해 했어야 했는데 너무 대충 읽었음..ㅠ 비어있는 공간에 발견 했을 때 그부분 위주로 음료수 채우는 거면
 *     그 구간은 이미 탐색 끝났다고 보고 다른 곳 찾아야 함 nxm 돌 때 첫 발견 했을 때 dfs나 bfs로 탐색 끝난거임
 *   - 한 번 발견했으면 거기서부터 비어있는 곳 끝까지 찾는 방법이 낫나..? 그래서 dfs 활용한 듯 ?
 * 강의 풀이: DFS 활용
 *  1. 특정한 지점의 주변 상하좌우를 살펴본 뒤에 주변 지점 중에서 값이 0이면서 아직 방문하지 않은 지점이 있다면 해당 지점 방문
 *  2. 방문한 지점에서 다시 상하좌우를 살펴보면서 방문을 진행하는 과정을 반복하면, 연결된 모든 지점을 방문할 수 있음
 *  3. 모든 노드에 대하여 1~2번 과정을 반복하며, 방문하지 않은 지점의 수를 카운트
 */
function getFillCount(n, m, arr) {
    let answer = 0;

    const dfs = (h, w) => {
        // 범위 벗어나는 경우 종료
        if (h < 0 || h >= n || w < 0 || w >= m) return false;

        if (arr[h][w] === 0) {
            // 해당 노드 방문 처리
            arr[h][w] = 1;

            // 상하좌우도 비어있는지 확인 할 수 있도록 재귀적으로 호출
            dfs(h - 1, w);
            dfs(h + 1, w);
            dfs(h, w - 1);
            dfs(h, w + 1);
            return true;
        }

        return false;
    };

    // 이중for문 돌면 비효율적이라고 생각해서 아예 생각 안했음 일단 해보고 성능 구리면 최적화 하기
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (dfs(i, j) === true) {
                answer++;
            }
        }
    }

    return answer;
}

runTest("getFillCount", getFillCount, 3, 4, 5, [
    [0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
]);

/**
 * 문제: 미로 탈출 (난이도 1.5/3)
 * 내 풀이: 최소 이동 칸 개수 구하기니까 BFS
 *   - 상하좌우 탐색 탐색할 때마다 누적합 저장
 *   - dx, dy 배열 저장 for문 돌리기
 *   - 방문 여부 체크
 * 강의 풀이보다 빠름, 방문 여부 차이인듯
*/
function getMinStepsToExit(n, m, arr) {
    // 상 하 좌 우
    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];

    const queue = [[0, 0, 1]];

    // 방문했는지 확인 필요
    const visited = new Set();

    while (queue.length) {
        const [x, y, count] = queue.shift();

        // 상하좌우로 괴물 없는 부분인지 확인하고 맞으면 1 더하고 제일 먼저 도착점 도달하면 최단거리 리턴
        if (x === m - 1 && y === n - 1) return count;

        if (visited.has(`${x},${y}`)) {
            continue;
        } else {
            visited.add(`${x},${y}`);
        }

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx >= 0 && ny >= 0 && nx < m && ny < n && arr[ny][nx]) {
                queue.push([nx, ny, count + 1]);
            }
        }
    }

    return 0;
}

runTest('getMinStepsToExit', getMinStepsToExit, 10, 5, 6, [
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
]);
