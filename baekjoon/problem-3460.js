/**
 * 문제 3460: 이진수
 * 첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있고, n이 주어진다. (1 ≤ T ≤ 10, 1 ≤ n ≤ 106)
 * 각 테스트 케이스에 대해서, 1의 위치를 공백으로 구분해서 줄 하나에 출력한다. 위치가 낮은 것부터 출력한다.
 * index 중복불가
 * 
*/

// 문제를 잘 읽고 풀도록 하자. 속도가 좀 느린 것 같은데 평균인 것 같다.
import { runTest } from '../test-helper.js';

function soluction(arr) {
    let answer = '';
    const t = arr[0];

    for (let i = 1; i <= t; i++) {
        const bin = Array.from(parseInt(arr[i]).toString(2));
        bin.reverse();

        for (let j = 0; j < bin.length; j++) {
            if (bin[j] === '1') {
                answer += `${j + ' '}`;
            }
        }
    }

    return answer.trimEnd();
}

runTest('이진수 #1', soluction, '0 2 3', ['1', '13']);

// const fs = require('fs');
// const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// function solution(arr) {
//     let answer = '';
//     const t = arr[0];

//     for (let i = 1; i <= t; i++) {
//         const bin = Array.from(parseInt(arr[i]).toString(2));
//         bin.reverse();

//         for (let j = 0; j < bin.length; j++) {
//             if (bin[j] === '1') {
//                 answer += `${j + ' '}`;
//             }
//         }
//     }

//     console.log(answer.trimEnd());
// }

// solution(arr);