/**
 * 문제 2609: 최대공약수와 최소공배수
 * 
 * 입력: 첫째 줄에는 두 개의 자연수가 주어짐 (10000이하의 자연수)
 * 출력: 첫째 줄 두 수의 최대공약수, 둘째 줄 두 수의 최소 공배수
*/
import { runTest } from '../test-helper.js';
function solution(input) {
    // 최대공약수 구할 때 a>b여야 해서 내림차순 정렬
    const [a, b] = input.split(' ').map(Number).sort((a, b) => b - a);

    const gcd = getGcd(a, b); // 최대공약수
    const lcm = a * b / gcd; // 최소공배수 = a*b/최대공약수

    return `${gcd}\n${lcm}`;
}

function getGcd(a, b) {
    const r = a % b;
    if (r === 0) return b;
    else {
        return getGcd(b, r);
    }
}

runTest('최대공약수와 최소공배수 #1', solution, '6\n72', '24 18');

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString();

// function solution(input) {
//     // 최대공약수 구할 때 a>b여야 해서 내림차순 정렬
//     const [a, b] = input.split(' ').map(Number).sort((a, b) => b - a);

//     const gcd = getGcd(a, b);
//     const lcm = a*b/gcd;

//     console.log(`${gcd}\n${lcm}`);
// }

// function getGcd(a, b) {
//     const r = a % b;
//     if (r === 0) return b;
//     else {
//         return getGcd(b, r);
//     }
// }

// solution(input);