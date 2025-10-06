import { runTest } from '../../../test-helper.js';
import fs from 'fs';

const input1 = fs.readFileSync('./inflearn/javascript/section4/input1.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section4/input2.txt').toString().trim().split('\n');

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

runTest('자릿수의 합 #1', solution1, 137, input1[0], input1[1].split(' ').map(Number));
runTest('뒤집은 소수 #1', solution2, '23 2 73 2 3', input2[0], input2[1].split(' ').map(Number));
