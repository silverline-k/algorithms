import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input1 = fs.readFileSync('./inflearn/javascript/section5/input1.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section5/input2.txt').toString().trim().split('\n');
const input3 = fs.readFileSync('./inflearn/javascript/section5/input3.txt').toString().trim().split('\n');

// 1. 두 배열 합치기
// while문 3개나 썼는데 더 좋은 방법 없는지 찾아보기
function solution1(n, arr1, m, arr2) {
    const answer = [];
    let p1 = 0;
    let p2 = 0;

    while (p1 < n && p2 < m) {
        if (arr1[p1] <= arr2[p2]) answer.push(arr1[p1++]);
        else answer.push(arr2[p2++]);
    }

    while (p1 < n) answer.push(arr1[p1++]);
    while (p2 < m) answer.push(arr2[p2++]);

    return answer.join(' ');
}

// 2. 공통원소 구하기
// A, B 두 개의 집합의 공통 원소 추출 후 오름차순으로 출력하기
function solution2(n, m, arr1, arr2) {
    let answer = [];
    let p1 = 0;
    let p2 = 0;
    const commons = new Set();

    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    while (p1 < n && p2 < m) {
        if (arr1[p1] === arr2[p2]) {
            commons.add(arr1[p1]);
            p1++;
            p2++;
        }
        else if (arr1[p1] > arr2[p2]) p2++;
        else if (arr1[p1] < arr2[p2]) p1++;
    }

    answer = [...commons];

    return answer.join(' ');
}

// 연속 부분수열1
// 연속부분수열의 합이 특정숫자 M이 되는 경우가 몇 번 있는지 구하기
// 슬라이딩 윈도우 적용해서 구해야 할 듯
function solution3(n, m, sequence) {
    let answer = 0;
    let sum = 0;
    let start = 0;

    for (let i = 0; i < n; i++) {
        sum += sequence[i];

        if (sum === m) {
            sum -= sequence[start];
            answer++;
            start++;
        } else if (sum > m) {
            sum -= sequence[start];
            if (sum === m) {
                answer++;
                start++;
            }
        }
    }

    return answer.toString();
}

runTest('두 배열 합치기 #1', solution1, '1 2 3 3 5 6 7 9', parseInt(input1[0]), input1[1].split(' ').map(Number), parseInt(input1[2]), input1[3].split(' ').map(Number));
runTest('공통원소 구하기 #1', solution2, '2 3 5', parseInt(input2[0]), parseInt(input2[1]), input2[2].split(' ').map(Number), input2[3].split(' ').map(Number));
runTest('연속 부분수열1 #1', solution3, '3', parseInt(input3[0].split(' ')[0]), parseInt(input3[0].split(' ')[1]), input3[1].split(' ').map(Number));