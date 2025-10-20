import fs from 'fs';
import { runTest } from '../../../test-helper.js';
const input1_1 = fs.readFileSync('./inflearn/javascript/section6/input1-1.txt').toString().trim().split('\n');
const input1_2 = fs.readFileSync('./inflearn/javascript/section6/input1-2.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section6/input2.txt').toString().trim().split('\n');

// 1. 올바른 괄호
// 문자열의 최대 길이 30
// (())() 정상, (()())) 비정상
function solution1(str) {
    let answer = 'YES';
    const stack = [];

    for (const ch of str) {
        if (ch === '(') stack.push(ch);
        else {
            if (stack.length === 0) return 'NO';
            stack.pop();
        }
    }

    if (stack.length > 0) answer = 'NO';

    return answer;
}

// 2. 괄호문자제거
// 소괄호 사이에 존재하는 모든 문자 제거하고 남은 문자만 출력
function solution2(str) {
    let answer = '';
    const stack = [];

    for (const ch of str) {
        if (ch === ')') {
            while(stack.length && stack.pop()!=='(');
        } else stack.push(ch);
    }

    answer = stack.join('');

    return answer;
}

runTest('올바른 괄호 #1', solution1, 'NO', input1_1[0]);
runTest('올바른 괄호 #2', solution1, 'YES', input1_2[0]);
runTest('괄호문자제거 #1', solution2, 'EFLM', input2[0]);