/**
 * 문제 2693: N번째 큰 수
 * 
 * 한 줄에 하나씩 배열 A에서 3번째 큰 값 출력
 * 배열 A 크기 항상 10, N은 3, 테스트 케이스의 개수 (1<=T<=1000)
*/
// 그냥 js 정렬로 하긴 싫은데.... 테스트 케이스 개수 1000개정도면 상관없으려나?
// 알고리즘 문제라서 javascript sort 메서드 사용하는 것 말고 직접 구현하는 것도 공부에 도움된다. 구현하자.
import { runTest } from '../test-helper.js';

function solution(input) {
    const [T, ...arrStr] = input.split('\n');
    const arr = arrStr.map(v => v.split(' ').map(Number));
    const answer = [];

    for (let i = 0; i < T; i++) {
        arr[i].sort((a, b) => a - b);
        answer.push(arr[i][7]);
    }

    return answer.join('\n');
}

runTest('N번째 큰 수 #1', solution, '8\n489\n931\n768', '4\n1 2 3 4 5 6 7 8 9 1000\n338 304 619 95 343 496 489 116 98 127\n931 240 986 894 826 640 965 833 136 138\n940 955 364 188 133 254 501 122 768 408');

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString();
// function solution(input) {
//     const [T, ...arrStr] = input.split('\n');
//     const arr = arrStr.map(v => v.split(' ').map(Number));
//     const answer = [];

//     for (let i = 0; i < T; i++) {
//         arr[i].sort((a, b) => a - b);
//         answer.push(arr[i][7]);
//     }

//     console.log(answer.join('\n'));
// }
// solution(input);