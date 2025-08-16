/**
 * 문제 10870: 피보나치 수5
 * 
 * n번째 피보나치 수 구하기
 * n은 20보다 작거나 같은 자연수 또는 0
*/
import { runTest } from '../test-helper.js';

function solution(n) {
    return recursive(n);
}

function recursive(num) {
    if (num <= 0) return 0;
    else if (num === 1) return 1;

    return recursive(num - 2) + recursive(num - 1)
}

runTest('피보나치 수5 #1', solution, 55, 10);

// const fs = require('fs');
// const [input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// function solution(n) {
//     console.log(recursive(n));
// }

// function recursive(num) {
//     if (num <= 0) return 0;
//     else if (num === 1) return 1;

//     return recursive(num - 2) + recursive(num - 1)
// }

// solution(parseInt(input));