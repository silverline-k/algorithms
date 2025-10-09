import { runTest } from '../../../test-helper.js';
import fs from 'fs';

const input1 = fs.readFileSync('./inflearn/javascript/section4/input1.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section4/input2.txt').toString().trim().split('\n');
const input3 = fs.readFileSync('./inflearn/javascript/section4/input3.txt').toString().trim().split('\n');

// 1. 자릿수의 합
// 타입 변환해서 구현할 생각하지 말고 수학적으로 생각할 것
function solution1(_, arr) {
    let answer = Number.MIN_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    for (let num of arr) {
        let tmp = num;
        let sum = 0;

        // 자릿수 별로 더해야 하기 때문에 나머지가 0이 될 때까지
        // ex) 123 -> 123/10 = 12, 123%10 = 3
        //            12/10  =  1, 12%10  = 2
        while (tmp) {
            sum += tmp % 10;
            tmp = Math.floor(tmp / 10);
        }

        if (sum > max) {
            max = sum;
            answer = num;
        } else if (sum === max) {
            answer = num > answer ? num : answer;
        }
    }

    return answer;
}

function isPrime(num) {
    if (num < 2) return false;

    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }

    return true;
}

// 2. 뒤집은 소수
function solution2(_, arr) {
    const answer = [];

    // 내장함수 사용해서 타입 변환 후 reverse 할 경우 0.040125 ms
    // for (let num of arr) {
    //     let res = Number(num.toString().split('').reverse().join(''));
    //     if (isPrime(res)) answer.push(res);
    // }

    // 수학적으로 풀 경우 0.032958 ms
    for (let num of arr) {
        let rev = 0;

        while (num) {
            let tmp = num % 10;
            rev = rev * 10 + tmp;
            num = Math.floor(num / 10);
        }

        if (isPrime(rev)) answer.push(rev);
    }

    return answer.join(' ');
}

// 3. 멘토링 - 멘토,멘티가 되는 짝을 만들 수 있는 경우 몇 가지인지?
// M번의 수학테스트 등수를 가지고 멘토, 멘티 정함
// ex) 멘토A, 멘티B 로 짝이 됐을 때 A는 M번의 수학테스트에서 모두 B보다 등수가 앞서야 함
// function solution3(n, m, ranks) { // 학생 수, 수학테스트 횟수, 테스트 결과
//     let answer = 0;

//     // (1, 1), (1, 2) ... (4, 4)
//     for (let i = 1; i <= n; i++) {
//         for (let j = 1; j <= n; j++) {
//             let count = 0;

//             for (let k = 0; k < m; k++) {
//                 let pi = 0;
//                 let pj = 0;
//                 for (let s = 0; s < n; s++) {
//                     if (ranks[k][s] === i) pi = s;
//                     if (ranks[k][s] === j) pj = s;
//                 }
//                 if (pi < pj) count++;
//             }

//             if (count === m) answer++;
//         }
//     }

//     return answer;
// }

// 브루트포스 연습 문제여도 4중 반복문은 피하고자 아래와 같은 최적화 코드 참고 할 것
function solution3(n, m, ranks) {
    let answer = 0;

    // 1️⃣ pos[k][student] = k번째 테스트에서 student의 등수 인덱스
    const pos = Array.from({ length: m }, () => Array(n + 1).fill(0));

    for (let k = 0; k < m; k++) {
        for (let s = 0; s < n; s++) {
            pos[k][ranks[k][s]] = s;
        }
    }

    // 2️⃣ 모든 멘토(i), 멘티(j) 조합 검사
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (i === j) continue; // 자기 자신은 멘토/멘티 불가

            let isValid = true;
            for (let k = 0; k < m; k++) {
                if (pos[k][i] >= pos[k][j]) { // i가 j보다 등수가 뒤거나 같음
                    isValid = false;
                    break;
                }
            }

            if (isValid) answer++;
        }
    }

    return answer;
}

runTest('자릿수의 합 #1', solution1, 137, input1[0], input1[1].split(' ').map(Number));
runTest('뒤집은 소수 #1', solution2, '23 2 73 2 3', input2[0], input2[1].split(' ').map(Number));
runTest('멘토링 #1', solution3, 3, parseInt(input3[0].split(' ')[0]), parseInt(input3[0].split(' ')[1]), input3.slice(1).map((v) => v.split(' ').map(Number)));
