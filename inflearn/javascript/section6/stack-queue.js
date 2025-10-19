import fs from 'fs';
import { runTest } from '../../../test-helper.js';
const input1_1 = fs.readFileSync('./inflearn/javascript/section6/input1-1.txt').toString().trim().split('\n');
const input1_2 = fs.readFileSync('./inflearn/javascript/section6/input1-2.txt').toString().trim().split('\n');

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

runTest('올바른 괄호 #1', solution1, 'NO', input1_1[0]);
runTest('올바른 괄호 #2', solution1, 'YES', input1_2[0]);