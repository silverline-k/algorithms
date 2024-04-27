import { runTest } from '../test-helper.js';

function selectSsireumPlayers(n, players) {
    players.sort((a, b) => b[0] - a[0]);

    let answer = 1;
    let largest = players[0][1];

    for (let i = 1; i < n; i++) {
        if (largest < players[i][1]) {
            largest = players[i][1];
            answer++;
        }
    }

    return answer;
}

runTest('selectSsireumPlayers #1', selectSsireumPlayers, 3, 5, [[172, 67], [183, 65], [180, 70], [170, 72], [181, 60]]);

// count만큼의 높이 조정을 마친 후 가장 높은 곳과 가장 낮은 곳의 차이 구하기
function adjustBoxHeight(width, boxHeights, count) {
    let answer = 0;

    boxHeights.sort((a, b) => a - b);

    for (let i = 0; i < count; i++) {
        boxHeights[0] += 1;
        boxHeights[width - 1] -= 1;

        boxHeights.sort((a, b) => a - b);
    }

    let min = boxHeights[0];
    let max = boxHeights[width - 1];

    answer = max - min;

    return answer;
}

runTest('adjustBoxHeight #1', adjustBoxHeight, 20, 10, [69, 42, 68, 76, 40, 87, 14, 65, 76, 81], 50);

function generateIncreasingSequence(n, numbers) {
    let answer = '';

    let left = 0;
    let right = n - 1;

    let tmp = [];
    let lastNumber = 0;

    while (left <= right) {
        if (numbers[left] > lastNumber) tmp.push([numbers[left], 'L']);
        if (numbers[right] > lastNumber) tmp.push([numbers[right], 'R']);

        if (tmp.length === 0) break;

        tmp.sort((a, b) => a[0] - b[0]);

        if (tmp[0][1] === 'L') {
            lastNumber = numbers[left];
            answer += 'L';
            left += 1;
        } else if (tmp[0][1] === 'R') {
            lastNumber = numbers[right];
            answer += 'R';
            right -= 1;
        }

        tmp = [];
    }

    return answer;
}

runTest('generateIncreasingSequence #1', generateIncreasingSequence, 'LRLL', 5, [2, 4, 5, 1, 3]);
runTest('generateIncreasingSequence #2', generateIncreasingSequence, 'LRR', 10, [3, 2, 10, 1, 5, 4, 7, 8, 9, 6]);

function generateInverseSequence(n, numbers) {
    let answer = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        let index = numbers[i];

        for (let j = 0; j < index + 1; j++) {
            // 현재 숫자보다 작은 숫자가 겹치게 있거나 앞에 있으면 +1 해줘야 함
            if (answer[j] !== 0) index++;
        }

        answer[index] = i + 1;
    }

    return answer;
}

runTest('generateInverseSequence #1', generateInverseSequence, [4, 8, 6, 2, 5, 1, 3, 7], 8, [5, 3, 4, 0, 2, 1, 1, 0]);
runTest('generateInverseSequence #2', generateInverseSequence, [2, 12, 8, 28, 21, 30, 4, 19, 25, 15, 27, 9, 6, 29, 20, 14, 16, 18, 23, 13, 26, 11, 3, 5, 1, 7, 17, 22, 24, 10], 30, [24, 0, 21, 5, 20, 10, 19, 1, 8, 20, 16, 0, 13, 9, 5, 8, 11, 8, 3, 6, 1, 7, 5, 6, 2, 4, 2, 0, 1, 0])
