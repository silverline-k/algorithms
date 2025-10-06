import { runTest } from '../../../test-helper.js';
import fs from 'fs';

const [n, arrStr] = fs.readFileSync('./inflearn/javascript/section4/input1.txt').toString().trim().split('\n');
const arr = arrStr.split(' ').map(Number);

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

runTest('자릿수의 합 #1', solution1, 137, n, arr);
