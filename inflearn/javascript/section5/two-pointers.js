import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input1 = fs.readFileSync('./inflearn/javascript/section5/input1.txt').toString().trim().split('\n');

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

runTest('두 배열 합치기 #1', solution1, '1 2 3 3 5 6 7 9', parseInt(input1[0]), input1[1].split(' ').map(Number), parseInt(input1[2]), input1[3].split(' ').map(Number));