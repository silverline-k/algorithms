// 내장 메서드 사용하지 않고 풀어보기
import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input1 = fs.readFileSync('./inflearn/javascript/section7/input1.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section7/input2.txt').toString().trim().split('\n');

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

runTest('선택 정렬 #1', solution1, '5 7 11 13 15 23', parseInt(input1[0]), input1[1].split(' ').map(Number));
runTest('버블 정렬 #1', solution2, '5 7 11 13 15 23', parseInt(input2[0]), input2[1].split(' ').map(Number));

