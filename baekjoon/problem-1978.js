/**
 * 문제 1978: 소수 찾기
 * 
 * N: 수의 개수
 * 1000 이하의 자연수가 주어짐
*/
import { runTest } from '../test-helper.js';

function isPrime(number) {
    if (number < 2 ) return false;
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) return false;
    }
    return true;
}

function solution(input) {
    const [N, arr] = input.split('\n');
    const nums = arr.split(' ').map(Number);
    
    let answer = 0;

    for (let i = 0; i < N; i++) {
        if (isPrime(nums[i])) answer++;
    }

    return answer;
}

runTest('소수 찾기 #1', solution, 3, '4\n1 3 5 7');

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString();
// function isPrime(number) {
//     if (number < 2 ) return false;
//     for (let i = 2; i * i <= number; i++) {
//         if (number % i === 0) return false;
//     }
//     return true;
// }

// function solution(input) {
//     const [N, arr] = input.split('\n');
//     const nums = arr.split(' ').map(Number);
    
//     let answer = 0;

//     for (let i = 0; i < N; i++) {
//         if (isPrime(nums[i])) answer++;
//     }

//     console.log(answer);
// }

// solution(input);
