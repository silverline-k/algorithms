// 내장 메서드 사용하지 않고 풀어보기
import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input1 = fs.readFileSync('./inflearn/javascript/section7/input1.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section7/input2.txt').toString().trim().split('\n');
const input3 = fs.readFileSync('./inflearn/javascript/section7/input3.txt').toString().trim().split('\n');
const input4 = fs.readFileSync('./inflearn/javascript/section7/input4.txt').toString().trim().split('\n');
const input5 = fs.readFileSync('./inflearn/javascript/section7/input5.txt').toString().trim().split('\n');
const input6_1 = fs.readFileSync('./inflearn/javascript/section7/input6-1.txt').toString().trim().split('\n');
const input6_2 = fs.readFileSync('./inflearn/javascript/section7/input6-2.txt').toString().trim().split('\n');
const input7 = fs.readFileSync('./inflearn/javascript/section7/input7.txt').toString().trim().split('\n');

// 1. 선택 정렬
// 배열 항목 차례대로 도는데
// 현재 index와 오른쪽 index들의 값 비교해서 더 작은 값과 스왑
function solution1(n, arr) {
    let tmp;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) {
                tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }

    return arr.join(' ');
}

// 2. 버블 정렬
// 오름차순으로 정렬하기
function solution2(n, arr) {
    let tmp;

    for (let i = 0; i < n; i++) {
        // 버블 정렬은 변경하면 오른쪽부터 높은 숫자로 고정돼서 i만큼 빼주기
        for (let j = i + 1; j < n - i; j++) {
            if (arr[j - 1] > arr[j]) {
                tmp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }

    return arr.join(' ');
}

// 3. Special Sort(구글 인터뷰)
// 강의 풀이, 버블 정렬로 풂
function solution3(n, arr) {
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > 0 && arr[j + 1] < 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return arr.join(' ');
}
// 음수 발견하면 해당 index에 넣고 나머지 +1
// function solution3(n, arr) {
//     let tmp;

//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             if (arr[j] < 0) {
//                 tmp = arr[i];
//                 arr[i] = arr[j];

//                 for (let k = i + 1; k <= j; k++) {
//                     [arr[k], tmp] = [tmp, arr[k]];
//                 }

//                 break;
//             }
//         }
//     }

//     return arr.join(' ');
// }

// 4. 삽입 정렬 - 오름차순
// 현재 인덱스의 값을 왼쪽에 있는 값과 비교해서 더 작은값이면 스왑
function solution4(n, arr) {
    let answer = '';

    for (let i = 1; i < n; i++) {
        let curr = i;

        while (curr >= 0) {
            if (arr[curr] < arr[curr - 1]) {
                [arr[curr], arr[curr - 1]] = [arr[curr - 1], arr[curr]];
                curr--;
            } else curr = -1;
        }
    }

    answer = arr.join(' ');

    return answer;
}

// 5. Least Recently Used(카카오 캐시 문제 변형)
// 저장되어 있는 작업은 맨 앞이 가장 최근
// 새로운 작업을 캐시에 저장할 때 모든 작업은 뒤로 밀리고 제일 마지막에 있던 작업은 캐시에서 삭제됨
// 마지막 작업 후 캐시메모리의 상태를 가장 최근 사용된 작업부터 차례대로 출력
function solution5(size, n, jobs) {
    let answer = Array(size).fill(0);

    for (const job of jobs) {
        let pos = -1;
        for (let i = 0; i < size; i++) {
            if (answer[i] === job) {
                pos = i;
                break;
            }
        }

        if (pos !== -1) {
            // cache miss
            for (let j = pos; j > 0; j--) {
                answer[j] = answer[j - 1];
            }
        } else {
            // cache hit
            for (let j = size - 1; j > 0; j--) {
                answer[j] = answer[j - 1];
            }
        }

        answer[0] = job;
    }

    return answer.join(' ');
}

// 6. 장난꾸러기 현수
// 반 학생들 키 작은 순서대로 세우고 앞에서부터 번호 부여 (1~n번까지)
// input: N(5<=N<=100), 학생들키(120<=H<=180)
// output: 현수 배정 번호, 짝꿍 배정 번호 출력
// function solution6(n, arr) {
//     let num1 = -1;
//     let num2 = -1;

//     for (let i = 1; i < n; i++) {
//         if (arr[i - 1] > arr[i]) {
//             if (num1 === -1) num1 = i;
//             else if (num2 === -1) num2 = i + 1;
//         } else if (arr[i - 1] === arr[i]) {
//             if (num1 === -1) num1 = i;
//         }
//     }

//     return `${num1} ${num2}`;
// }
/**
 * 강의 풀이 (내가 푼건 너무 1차원적으로 단순하게 생각함)
 * 1. 정렬하기
 * 2. 원래 서 있어야 할 순서와 바꾼 상태 비교하기
 * 3. 서로 값이 다른 index를 +1 해서 answer에 push하기
*/
function solution6(n, arr) {
    let answer = [];
    let sortArr = arr.slice();
    sortArr.sort((a, b) => a - b);

    for (let i = 0; i < n; i++) {
        if (arr[i] !== sortArr[i]) answer.push(i + 1);
    }

    return answer.join(' ');
}

// 7. 좌표 정렬 (그리디 문제 대비 정렬 문제)
// N개의 표면상 좌표(x, y)가 주어지면 모든 좌표 오름차순으로 정렬
// 정렬 기준: x값 우선, 같을 경우 y값까지
// input: 좌표 개수 N(3<=N<=100000), 좌표 목록 2차원배열
// output: N개의 좌표 정렬해서 출력
function solution7(n, arr) {
    let answer = [];

    arr.sort((a,b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        else return a[0] - b[0];
    });
    answer = arr;

    return answer;
}

runTest('선택 정렬 #1', solution1, '5 7 11 13 15 23', parseInt(input1[0]), input1[1].split(' ').map(Number));
runTest('버블 정렬 #1', solution2, '5 7 11 13 15 23', parseInt(input2[0]), input2[1].split(' ').map(Number));
runTest('Special Sort(구글 인터뷰)', solution3, '-3 -2 -6 1 2 3 5 6', parseInt(input3[0]), input3[1].split(' ').map(Number));
runTest('삽입 정렬 #1', solution4, '5 6 7 9 10 11', parseInt(input4[0]), input4[1].split(' ').map(Number));
runTest('Least Recently Used(카카오 캐시 문제 변형) #1', solution5, '7 5 3 2 6', parseInt(input5[0].split(' ')[0]), parseInt(input5[0].split(' ')[1]), input5[1].split(' ').map(Number));
runTest('장난꾸러기 현수 #1', solution6, '3 8', parseInt(input6_1[0]), input6_1[1].split(' ').map(Number));
runTest('장난꾸러기 현수 #2', solution6, '3 5', parseInt(input6_2[0]), input6_2[1].split(' ').map(Number));
runTest('좌표 정렬 #1', solution7, [[1, 2], [1, 3], [2, 5], [2, 7], [3, 6]], input7.shift(), input7.map(v => v.split(' ').map(Number)));
