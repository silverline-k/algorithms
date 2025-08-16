/**
 * 문제 2309: 일곱 난쟁이
 * 
 * 일곱 난쟁이의 키는 다 합치면 100
 * 입력: 아홉 개의 줄 -> 난쟁이들 키 (주어진 키는 100을 넘지 않는 자연수)
 * 출력: 일곱 난쟁이의 키를 오름차순으로 출력
 * 
 * 아홉 난쟁이에서 두 난쟁이의 합을 빼서 100이 되면 해결되는 간단한 문제였음,,
*/
import { runTest } from '../test-helper.js';

function solution(input) {
    const heights = input.split('\n').map(Number);
    const heightsSum = heights.reduce((prev, cur) => prev + cur, 0);

    for (let i = 0; i < heights.length; i++) {
        for (let j = 0; j < heights.length; j++) {
            if (i === j) break;
            if (heightsSum - (heights[i] + heights[j]) === 100) {
                const dwarfs = heights.filter((_, idx) => idx !== i && idx !== j).sort((a, b) => a - b);

                return dwarfs.join('\n');
            }
        }
    }

    return '';
}

runTest('일곱 난쟁이 #1', solution, '7\n8\n10\n13\n19\n20\n23', '20\n7\n23\n19\n10\n15\n25\n8\n13');

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

// const sum = input.reduce((a, b) => a + b, 0);

// for (let i = 0; i < input.length; i++) {
//     for (let j = i + 1; j < input.length; j++) {
//         if (sum - (input[i] + input[j]) === 100) {
//             // index splice 연속으로 하는 경우 앞에서 배열 순서 달라지기 때문에 쓰면 안됨 (바보)
//             // join() 쓰면 간단하게 변경 가능
//             const result = input.filter((_, idx) => idx !== i && idx !== j);
//             console.log(result.sort((a, b) => a - b).join('\n'));
//             return;
//         }
//     }
// }