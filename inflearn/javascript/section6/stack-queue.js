import fs from 'fs';
import { runTest } from '../../../test-helper.js';
const input1_1 = fs.readFileSync('./inflearn/javascript/section6/input1-1.txt').toString().trim().split('\n');
const input1_2 = fs.readFileSync('./inflearn/javascript/section6/input1-2.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section6/input2.txt').toString().trim().split('\n');
const input3 = fs.readFileSync('./inflearn/javascript/section6/input3.txt').toString().trim().split('\n');
const input4 = fs.readFileSync('./inflearn/javascript/section6/input4.txt').toString().trim().split('\n');

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
            while (stack.length && stack.pop() !== '(');
        } else stack.push(ch);
    }

    answer = stack.join('');

    return answer;
}

// 3. 크레인 인형뽑기(카카오 기출)
// 크레인 인형뽑기 게임 N x N 크기의 정사각형 격자 (30 x 30 이하)
// 별도 바구니, 모든 인형은 1 x 1 크기의 격자 한 칸을 차지하고 아래 칸부터 쌓임
// 바구니는 모든 인형이 들어갈 수 있는 크키라고 가정
// 같은 모양의 인형 두 개가 연속해서 쌓이게 되면 터뜨려지고 바구니에서 사라짐
// moves길이만큼 board탐색 시간 복잡도 O(m x n)
function solution3(board, moves) {
    let answer = 0;
    const basket = [];

    for (const move of moves) {
        for (let i = 0; i < board.length; i++) {
            if (board[i][move - 1] !== 0) {
                if (basket.length && basket[basket.length - 1] === board[i][move - 1]) {
                    basket.pop();
                    answer += 2;
                } else basket.push(board[i][move - 1]);

                board[i][move - 1] = 0;
                break;
            }
        }
    }

    return answer;
}

// 4. 후위식 연산(postfix)
function solution4(str) {
    let answer = 0;
    const nums = [];

    // 피연산자 스택에 넣고 연산자 나오면 계산
    for (const x of str) {
        if (isNaN(x) && nums.length > 1) {
            const b = nums.pop();
            const a = nums.pop();
            let total = 0;

            switch (x) {
                case '+':
                    total = a + b;
                    break;
                case '-':
                    total = a - b;
                    break;
                case '*':
                    total = a * b;
                    break;
                case '/':
                    total = a / b;
                    break;
            }

            nums.push(total);
        } else nums.push(parseInt(x));
    }
    answer = nums[0];

    return answer;
}

runTest('올바른 괄호 #1', solution1, 'NO', input1_1[0]);
runTest('올바른 괄호 #2', solution1, 'YES', input1_2[0]);
runTest('괄호문자제거 #1', solution2, 'EFLM', input2[0]);
runTest('크레인 인형뽑기(카카오 기출) #1', solution3, 4, JSON.parse(input3[0]), JSON.parse(input3[1]));
runTest('후위식 연산(postfix) #1', solution4, 12, input4[0]);
