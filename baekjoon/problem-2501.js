// 문제 2501: 약수 구하기
/*
 * 두 개의 자연수 N과 K가 주어졌을 때, N의 약수들 중 K번째로 작은 수를 출력하는 프로그램
 */
import { runTest } from '../test-helper.js';

function solution(n, k) {
    const divisors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) divisors.push(i);
    }

    return divisors[k - 1] ?? 0; // 없으면 0 반환
}

runTest('약수구하기 #1', solution, 3, 6, 3);
runTest('약수구하기 #2', solution, 0, 25, 4);
runTest('약수구하기 #1', solution, 1, 2735, 1);


// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split(' ');
// const n = parseInt(input[0]);
// const k = parseInt(input[1]);


// function solution(n, k) {
//     const divisors = [];
//     for (let i = 1; i <= n; i++) {
//         if (n % i === 0) divisors.push(i);
//     }

//     console.log(divisors[k - 1] ?? 0);
// }

// solution(n, k);