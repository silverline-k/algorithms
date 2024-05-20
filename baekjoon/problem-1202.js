// 문제 1202: 보석 도둑
/**
 * 훔칠 수 있는 보석 가격의 합의 최댓값을 출력
*/
import { runTest } from '../test-helper.js';

// n: 보석 개수
// k: 가방 개수
// jewels: [무게, 가격][]
function solution(n, k, jewels, maxWeights) {
    let answer = 0;

    // 가방 무게 오름차순 정렬
    maxWeights.sort((a, b) => a - b);

    jewels.sort((a, b) => {
        if (a[1] - b[1] === 0) {
            return a[0] - b[0];
        }

        return b[1] - a[1];
    });

    const visited = new Set();

    for (let i = 0; i < k; i++) {
        const maxWeight = maxWeights[i];

        for (let j = 0; j < n; j++) {
            if (visited.has(j)) continue;

            if (maxWeight >= jewels[j][0]) {
                answer += jewels[j][1];
                visited.add(j);
                break;
            }
        }
    }

    return answer;
}

runTest('보석 도둑 #1', solution, 10, 2, 1, [[5, 10], [100, 100]], [11]);
runTest('보석 도둑 #2', solution, 164, 3, 2, [[1, 65], [5, 23], [2, 99]], [10, 2]);


// import fs from 'fs';
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const [n, k] = input[0].split(' ').map(Number);
// const jewels = input.slice(1, n + 1).map(v => v.split(' ').map(Number));
// const maxWeights = input.slice(n + 1, n + k + 1).map(Number);

// function solution(n, k, jewels, maxWeights) {
//     let answer = 0;

//     // 가방 무게 오름차순 정렬
//     maxWeights.sort((a, b) => a - b);

//     jewels.sort((a, b) => {
//         if (a[1] - b[1] === 0) {
//             return a[0] - b[0];
//         }

//         return b[1] - a[1];
//     });

//     const visited = new Array(n).fill(0);

//     for (let i = 0; i < k; i++) {
//         const maxWeight = maxWeights[i];

//         for (let j = 0; j < n; j++) {
//             if (visited[j] === 1) continue;

//             if (maxWeight >= jewels[j][0]) {
//                 answer += jewels[j][1];
//                 visited[j] = 1;
//                 break;
//             }
//         }
//     }

//     return answer;
// }

// console.log(solution(n, k, jewels, maxWeights));