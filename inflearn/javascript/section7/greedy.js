import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input8_1 = fs.readFileSync('inflearn/javascript/section7/input8-1.txt').toString().trim().split('\n');
const input8_2 = fs.readFileSync('inflearn/javascript/section7/input8-2.txt').toString().trim().split('\n');

// 8. 회의실 배정
// 한 개의 회의실, n개의 회의를 위해 시간 겹치지 않게 최대수의 회의 찾기
// input: 회의 수(1<=n<=100000), 각 회의 정보(시작시간, 끝나는시간)
// output: 최대 사용 회의 수
function solution8(n, arr) {
    let answer = 0;
    let endTime = 0;

    // 회의 종료 시간 순으로 오름차순 정렬하고(끝나는 시간 기준으로 해야 더 많이 할 수 있음, 시작시간은 기준이 되기엔 회의시간 길면 애매)
    // 종료 시간이 동일할 땐 시작 시간 오름차순 정렬해서 카운팅하기
    arr.sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        else return a[1] - b[1];
    });

    for (let i = 0; i < n; i++) {
        if (endTime <= arr[i][0]) {
            endTime = arr[i][1];
            answer++;
        }
    }

    return answer;
}

runTest('회의실 배정 #1', solution8, 3, parseInt(input8_1.shift()), input8_1.map(v => v.split(' ').map(Number)));
runTest('회의실 배정 #2', solution8, 2, parseInt(input8_2.shift()), input8_2.map(v => v.split(' ').map(Number)));
