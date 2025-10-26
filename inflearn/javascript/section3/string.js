import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input1 = fs.readFileSync('./inflearn/javascript/section3/input1.txt').toString().trim();
const input2 = fs.readFileSync('./inflearn/javascript/section3/input2.txt').toString().trim();

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

runTest('회문 문자열 #1', solution1, 'YES', input1);
runTest('유효한 팰린드롬 #1', solution2, 'YES', input2);
