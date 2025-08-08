/**
 * 문제 10818: 최소, 최대
 * 첫째 줄 정수의 개수 N (1<=N<=1000000)
 * 둘째 줄 N개의 정수 공백 구분 (-1000000<=x<=1000000)
 * 
 * 첫째 줄에 주어진 정수 N개의 최솟값과 최댓값을 공백으로 구분해 출력하기
*/
// import { runTest } from '../test-helper.js';
// function solution(n, arg) {
//     let min = arg[0];
//     let max = arg[0];

//     for (let i = 1; i < n; i++) {
//         if (min > arg[i]) min = arg[i];
//         if (max < arg[i]) max = arg[i];
//     }

//     return [min, max];
// }

// runTest('최소, 최대 #1', solution, [7, 35], 5, [20, 10, 35, 30, 7]);

// 파일 읽어오고 타입 변경할 때 주의. 이것 때문에 실행시간 느려짐
const fs = require('fs');
const [n, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const args = arr.split(' ').map(Number);

function solution(n, arg) {
    let min = arg[0];
    let max = arg[0];

    for (let i = 1; i < n; i++) {
        if (min > arg[i]) min = arg[i];
        if (max < arg[i]) max = arg[i];
    }

    console.log(`${min} ${max}`);
}
solution(n, args);
