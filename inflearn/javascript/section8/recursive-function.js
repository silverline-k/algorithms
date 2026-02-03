import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input1 = fs.readFileSync('inflearn/javascript/section8/input1.txt').toString().trim();
const input2 = fs.readFileSync('inflearn/javascript/section8/input2.txt').toString().trim();

// 1. 재귀함수
// 자연수 N이 입력되면 재귀함수 이용해서 1부터 N까지 출력
function solution1(n) {
    let answer = [];

    function dfs(n) {
        if (n === 0) return;

        dfs(n - 1);
        answer.push(n);
    }

    dfs(n);
    return answer.join(' ');
}

// 2. 재귀함수를 이용한 이진수 출력
// 10진수 N(1<=N<=1000)이 입력되면 2진수로 변환하여 출력, 단 재귀함수 이용
function solution2(n) {
    let answer = [];

    function dfs(decimal) {
        if (decimal === 0) return;

        dfs(Math.floor(decimal / 2));
        answer.push(decimal % 2);
    }

    dfs(n);

    return answer.join('');
}

runTest('재귀함수 #1', solution1, '1 2 3', input1);
runTest('재귀함수를 이용한 이진수 출력 #1', solution2, '1011', input2);