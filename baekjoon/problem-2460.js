/**
 * 문제 2469: 지능형 기차2
 * 1번역(출발역)부터 10번역(종착역)까지 10개의 정차역이 있는 노선
 * 기차 안에 사람이 가장 많을 때의 사람 수 계산
 * 
 * 역에서 기차에 탈 때 내릴 사람이 모두 내린 후에 기차에 탐
 * 
*/
import { runTest } from '../test-helper.js';
function solution(arr) {
    let currP = 0;
    let max = 0;

    for (let i = 0; i < arr.length; i++) {
        currP = currP - arr[i][0] + arr[i][1];
        if (currP > max) max = currP;
    }

    return max;
}
runTest('지능형 기차2 #1', solution, 42, [[0, 32], [3, 13], [28, 25], [17, 5], [21, 20], [11, 0], [12, 12], [4, 2], [0, 8][21, 0]]);

// const fs = require('fs');
// const [...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const inputArr = input.map(v => v.split(' ').map(Number));

// function solution(arr) {
//     let currP = 0;
//     let max = 0;

//     for (let i = 0; i < arr.length; i++) {
//         currP = currP - arr[i][0] + arr[i][1];
//         if (currP > max) max = currP;
//     }

//     console.log(max);
// }

// solution(inputArr);