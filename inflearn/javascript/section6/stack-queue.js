import fs from 'fs';
import { runTest } from '../../../test-helper.js';
const input1_1 = fs.readFileSync('./inflearn/javascript/section6/input1-1.txt').toString().trim().split('\n');
const input1_2 = fs.readFileSync('./inflearn/javascript/section6/input1-2.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section6/input2.txt').toString().trim().split('\n');
const input3 = fs.readFileSync('./inflearn/javascript/section6/input3.txt').toString().trim().split('\n');
const input4 = fs.readFileSync('./inflearn/javascript/section6/input4.txt').toString().trim().split('\n');
const input5_1 = fs.readFileSync('./inflearn/javascript/section6/input5-1.txt').toString().trim().split('\n');
const input5_2 = fs.readFileSync('./inflearn/javascript/section6/input5-2.txt').toString().trim().split('\n');
const input6 = fs.readFileSync('./inflearn/javascript/section6/input6.txt').toString().trim().split('\n');

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

// 5. 쇠막대기
// 레이저 수직 발사 쇠막대기 절단, 자신보다 긴 쇠막대기 위에만 놓일 수 있음
// 각 쇠막대기를 자르는 레이저 적어도 하나 존재, 레이저는 어떤 쇠막대기의 양 끝점과도 겹치지않음
// 레이저는 '()'로 표현, 쇠막대기의 왼쪽 끝 '(' 오른쪽 끝 ')'
// 잘려진 쇠막대기 조각의 총 개수 구하기
// !레이저 찾으면 스택에 넣고 while문으로 확인하려고 했는데 이 방법은 비효율적이고 무한루프 돈다. 원래 괄호 문자열에서 찾아서 해결할 것
function solution5(str) {
    let answer = 0;
    const stack = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ')') {
            stack.pop();
            // 바로 앞에 여는 괄호인 경우 레이저 판정, 잘린 막대기 더하기
            // 아닌 경우 막대기 판정, 해당 막대기는 끝났음 마지막 부분 +1
            if (str[i - 1] === '(') answer += stack.length;
            else answer++;
        } else stack.push(str[i]);
    }

    return answer;
}

// 6. 공주구하기
// 왕자 N명, 왕자들 나이 순으로 1번부터 N번까지 차례로 번호 매김
// 시계 방향 동그랗게 앉음. 1번 왕자부터 시계방향으로 1부터 시작하여 번호 외침
// 한 왕자가 K(특정숫자)를 외치면 그왕자는 제외, 다음 왕자부터 다시 1부터 재시작
// 마지막까지 남은 왕자가 공주 구할 수 있다고 했을 때 마지막 왕자 번호 출력하기
// function solution6(n, k) {
//     let answer = 0;
//     let tmp = 1; // tmp 변수 별도 관리해야 해서 가독성 떨어짐
//     const queue = [];

//     for (let i = 1; i <= n; i++) {
//         queue.push(i);
//     }

//     while (queue.length > 1) {
//         const princeNum = queue.shift();
//         if (tmp !== k) {
//             tmp++;
//             queue.push(princeNum);
//         } else tmp = 1;
//     }

//     answer = queue[0];

//     return answer;
// }
// 강의 코드 (위 아래 둘다 시간복잡도 O(n^2) => shift() 앞 요소 제거 후 나머지 요소 전부 앞으로 한 칸씩 당겨서 + while문)
function solution6(n, k) {
    let answer;
    let queue = Array.from({ length: n }, (_, i) => i + 1);
    while (queue.length) {
        for (let i = 1; i < k; i++) queue.push(queue.shift());
        queue.shift();
        if (queue.length === 1) answer = queue.shift();
    }

    return answer;
}

runTest('올바른 괄호 #1', solution1, 'NO', input1_1[0]);
runTest('올바른 괄호 #2', solution1, 'YES', input1_2[0]);
runTest('괄호문자제거 #1', solution2, 'EFLM', input2[0]);
runTest('크레인 인형뽑기(카카오 기출) #1', solution3, 4, JSON.parse(input3[0]), JSON.parse(input3[1]));
runTest('후위식 연산(postfix) #1', solution4, 12, input4[0]);
runTest('쇠막대기 #1', solution5, 17, input5_1[0]);
runTest('쇠막대기 #2', solution5, 24, input5_2[0]);
runTest('공주 구하기 #1', solution6, 7, parseInt(input6[0].split(' ')[0]), parseInt(input6[0].split(' ')[1]));
