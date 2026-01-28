import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input8_1 = fs.readFileSync('inflearn/javascript/section7/input8-1.txt').toString().trim().split('\n');
const input8_2 = fs.readFileSync('inflearn/javascript/section7/input8-2.txt').toString().trim().split('\n');
const input9 = fs.readFileSync('inflearn/javascript/section7/input9.txt').toString().trim().split('\n');

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

// 9. 결혼식
// 3일간의 피로연 장소 대여를 위해 친구들 N명의 참석 시간정보 받음
// 피로연 장소에 동시에 존재하는 최대 인원수 구하기
// 오는 시간 13, 가는 시간 15일 때 15시 정각에는 존재하지 않는다고 가정
// input: 피로연 참석 인원수(5<=N<=100000), 각 인원의 오는 시간과 가는시간 정수형 2차원 배열(0~72)
// output: 피로연장에 동시에 존재하는 최대 인원
function solution9(n, times) {
    let answer = 0;
    const timeline = [];

    // 내 풀이는 이중for문으로 돌면서 모든 경우를 확인했는데 강의 풀이처럼
    // 타임라인 만들어서 입장시간,퇴장시간 구분해서 플마해서 구하는게 훨씬 시간복잡도 효율적이다.
    // 간단하게 풀 수 있는 방법을 생각할 수 있도록 할 것.
    for (const [start, end] of times) {
        timeline.push([start, 's']);
        timeline.push([end, 'e']);
    }

    timeline.sort((a, b) => {
        if (a[0] === b[0]) return a[1].charCodeAt() - b[1].charCodeAt();
        else return a[0] - b[0];
    });

    let count = 0;
    for (const [_, type] of timeline) {
        if (type === 's') count++;
        else count--;
        answer = Math.max(answer, count);
    }

    return answer;
}

runTest('회의실 배정 #1', solution8, 3, parseInt(input8_1.shift()), input8_1.map(v => v.split(' ').map(Number)));
runTest('회의실 배정 #2', solution8, 2, parseInt(input8_2.shift()), input8_2.map(v => v.split(' ').map(Number)));
runTest('결혼식 #1', solution9, 2, parseInt(input9.shift()), input9.map(v => v.split(' ').map(Number)));
