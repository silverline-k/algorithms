import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input1 = fs.readFileSync('./inflearn/javascript/section3/input1.txt').toString().trim();
const input2 = fs.readFileSync('./inflearn/javascript/section3/input2.txt').toString().trim();
const input3 = fs.readFileSync('./inflearn/javascript/section3/input3.txt').toString().trim();
const input4 = fs.readFileSync('./inflearn/javascript/section3/input4.txt').toString().trim();
const input5 = fs.readFileSync('./inflearn/javascript/section3/input5.txt').toString().trim();

// 1. 회문 문자열
// 앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열인지 확인
// function solution1(str) {
//     const lowerStr = str.toLowerCase();
//     const length = str.length;

//     for (let i = 0; i < Math.floor(length / 2); i++) {
//         if (lowerStr[i] !== lowerStr[length - 1 - i]) return 'NO';
//     }

//     return 'YES';
// }
function solution1(str) {
    const lowerStr = str.toLowerCase();
    if (lowerStr.split('').reverse().join('') !== lowerStr) return 'NO';
    return 'YES';
}


// 2. 유효한 팰린드롬
// 알파벳만 가지고 회문 검사, 대소문자 구분x
// function solution2(str) {
//     const length = str.length - 1;
//     // 알파벳만 남겨놓고 비교하기
//     for (let i = 0; i < str.length; i++) {
//         if (/[A-Za-z]/.test(str[i])) {
//             if (str[i].toLowerCase() !== str[length - i].toLowerCase()) return 'NO';
//         }
//     }

//     return 'YES';
// }
// 위에 코드보다 빠름 0.175875 ms -> 0.062959 ms
function solution2(str) {
    const lowerStr = str.toLowerCase().replace(/[^a-z]/g, '');

    if (lowerStr.split('').reverse().join('') !== lowerStr) return 'NO';

    return 'YES';
}

// 3. 숫자만 추출
// 문자와 숫자가 섞여있는 문자열에서 숫자만 순서대로 자연수로 풀력
// *메서드 사용하지 않고 풀라고 했을 때 풀이 포함*
function solution3(str) { // parseInt 사용x, 수학적으로 풀기
    let answer = 0;

    for (const c of str) {
        if (!isNaN(c)) answer = answer * 10 + Number(c);
    }

    return answer;
}
// function solution3(str) { parseInt 사용
//     let answer = '';

//     for (const c of str) {
//         if (!isNaN(c)) answer += c;
//     }

//     return parseInt(answer);
// }
// function solution3(str) { 정규표현식 사용
//     let answer = str.replace(/[^0-9]/g, '');

//     return parseInt(answer);
// }

// 4. 가장 짧은 문자거리
// 한 개의 문자열 s와 문자 t가 주어짐 (소문자만, 길이 100이하)
// 문자열 s의 각 문자가 문자 t와 떨어진 최소거리 출력
// 그냥 간단하게 오른쪽으로 한 번, 왼쪽으로 한 번씩 돌면서 더 작은 값으로 저장하면 되는 거였음 O(n) 너무 복잡하게 생각하지 말기
function solution4(s, t) {
    let answer = [];
    let p = s.length; // 더 작은 값으로 비교해야 하니까 t 나오기 전 왼쪽 값들엔 아예 큰 값으로 저장

    // 오른쪽으로 탐색하면서 t만나면 0으로 초기화 아닐 땐 +1 하기
    for (let i = 0; i < s.length; i++) {
        if (s[i] === t) p = 0;
        else p++;

        answer.push(p);
    }

    p = s.length;
    // 왼쪽으로 탐색하면서 동일한 index에 기존에 저장되어 있던 값과 비교해서 더 작은 값으로 저장하기
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === t) p = 0;
        else {
            ++p;
            if (answer[i] > p) answer[i] = p;
        }
    }

    return answer.join(' ');
}

// 5. 문자열 압축
// 알파벳 대문자로 이루어진 문자열에서 같은 문자가 연속으로 반복되는 경우
// 반복되는 문자 압축하고 바로 오른쪽에 반복 횟수 표기해서 출력하기 (반복횟수 1은 생략)
function solution5(s) {
    let answer = '';
    let count = 1;
    const countMap = new Map();

    // map 사용해서 알파벳 별로 반복횟수 저장
    // 주어진 문자열에 공백 추가 해놓고 현재 알파벳과 다음 차례 알파벳이 동일한지 비교 후 동일하면 카운팅
    // (이미 카운팅된적 있는 알파벳이 또 연속 되어서 나올 때 대비해서 비교 연산 추가 했음)
    s += ' ';

    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === s[i + 1]) {
            count++;
            if ((countMap.has(s[i]) && countMap.get(s[i]) < count) || !countMap.has(s[i])) {
                countMap.set(s[i], count);
            }
        } else {
            count = 1;

            if (!countMap.has(s[i])) countMap.set(s[i], count);
        }
    }

    countMap.forEach((v, k) => {
        answer += k + (v > 1 ? v.toString() : '');
    });

    return answer;
}
// 강의 풀이 (내가 고려한 케이스 없을 때 풀이인 것 같고 뒤에 공백 추가해서 +1 index 값이랑 비교하도록 되어있음)
// function solution5(s) {
//     let answer = '';
//     let cnt = 1;

//     s += ' ';

//     for (let i = 0; i < s.length - 1; i++) {
//         if (s[i] === s[i + 1]) cnt++;
//         else {
//             answer += s[i];
//             if (cnt > 1) answer += String(cnt);
//             cnt = 1;
//         }
//     }

//     return answer;
// }

runTest('회문 문자열 #1', solution1, 'YES', input1);
runTest('유효한 팰린드롬 #1', solution2, 'YES', input2);
runTest('숫자만 추출 #1', solution3, 208, input3);
runTest('가장 짧은 문자거리 #1', solution4, '1 0 1 2 1 0 1 2 2 1 0', input4.split(' ')[0], input4.split(' ')[1]);
runTest('문자열 압축 #1', solution5, 'K2HS7E', input5);
