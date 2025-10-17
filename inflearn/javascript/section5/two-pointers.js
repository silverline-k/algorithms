import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input1 = fs.readFileSync('./inflearn/javascript/section5/input1.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section5/input2.txt').toString().trim().split('\n');
const input3 = fs.readFileSync('./inflearn/javascript/section5/input3.txt').toString().trim().split('\n');
const input4 = fs.readFileSync('./inflearn/javascript/section5/input4.txt').toString().trim().split('\n');
const input5 = fs.readFileSync('./inflearn/javascript/section5/input5.txt').toString().trim().split('\n');
const input6 = fs.readFileSync('./inflearn/javascript/section5/input6.txt').toString().trim().split('\n');
const input7_1 = fs.readFileSync('./inflearn/javascript/section5/input7-1.txt').toString().trim().split('\n');
const input7_2 = fs.readFileSync('./inflearn/javascript/section5/input7-2.txt').toString().trim().split('\n');
const input8 = fs.readFileSync('./inflearn/javascript/section5/input8.txt').toString().trim().split('\n');

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

// 3. 연속 부분수열1
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

// 4. 연속 부분수열2
// 3번 문제랑 비슷, 연속부분수열의 합이 특정숫자 M이하가 되는 경우가 몇 번 있는지 구하기
// 일단 n개만큼 만큼 도는데 돌면서 옆에 숫자와 더하기 전에 비교하기 n+m?
// 비교 끝나면 해당 index 제외하기
// 조건 충족하면 윈도우 오른쪽으로 증가, 아닌 경우 left+1부터 윈도우 크기 1부터 다시 시작
// function solution4(n, m, sequence) { // 해당 방법은 시간 복잡도 최악 O(n^2), 조건 넘길 때마다 sum초기화하고 모든 수가 작아서 m보다 훨씬 작은 경우 최악임
//     let answer = 0;
//     let sum = 0;
//     let left = 0;
//     let right = 0;

//     while (left < n) {
//         sum += sequence[right];

//         if (sum <= m) {
//             answer++;
//             right++;
//         } else {
//             left++;
//             right = left;
//             sum = 0;
//         }
//     }

//     return answer.toString();
// }
// 강의 풀이방법, 수학적으로 접근하기! O(n)
// 더 하면서 카운팅
function solution4(n, m, sequence) {
    let answer = 0;
    let sum = 0;
    let lt = 0;

    for (let rt = 0; rt < n; rt++) {
        sum += sequence[rt];
        while (sum > m) {
            sum -= sequence[lt++];
        }
        answer += (rt - lt + 1);
    }

    return answer.toString();
}

// 5. 최대 매출
// N일 동안의 매출기록, 연속된 K일 동안의 최대 매출액 얼마인지 구하기
// 슬라이딩 윈도우 활용하기 O(n)
// function solution5(n, k, dailySales) {
//     let answer = 0;
//     let sum = 0;
//     let count = 0;
//     let left = 0;

//     // n개만큼 돌기. k크기의 윈도우로 조회하고 더하기
//     for (let i = 0; i < n; i++) {
//         sum += dailySales[i];
//         if (count === k) {
//             sum -= dailySales[left++];
//             answer = Math.max(answer, sum);
//         } else count++;
//     }

//     return answer.toString();
// }
// 강의 풀이, 위에 풀이보다 분기처리 없어서 속도 더 빠름
function solution5(n, k, dailySales) {
    let answer = 0;
    let sum = 0;

    // k번까지 미리 계산
    for (let i = 0; i < k; i++) sum += dailySales[i];
    answer = sum;

    for (let i = k; i < n; i++) {
        // 슬라이딩 윈도우 패턴!
        sum += (dailySales[i] - dailySales[i - k]);
        answer = Math.max(answer, sum);
    }

    return answer.toString();
}

// 6. 학급 회장(해쉬)
// 투표용지를 보고 어떤 기호의 후보가 학급 회장이 되었는지 출력하기
// 반드시 한 명의 학급회장이 선출되도록 투표결과가 나왔다는 가정 (중복 없다는 뜻인가?)
function solution6(n, ballotPapers) {
    let answer = '';
    const ballot = new Map();

    for (let candidate of ballotPapers) {
        let count = ballot.get(candidate);

        if (count) {
            ballot.set(candidate, ++count);
        } else ballot.set(candidate, 1);
    }

    let max = 0;
    ballot.forEach((v, k) => {
        if (v > max) {
            max = v;
            answer = k;
        }
    });

    return answer;
}

// 7. 아나그램(해쉬)
// 길이가 같은 두 개의 문자열의 구성이 일치하는지 판별하기
function solution7(str1, str2) {
    let answer = 'YES';

    const str1Counts = new Map();
    const str2Counts = new Map();

    for (let str of str1) {
        if (str1Counts.has(str)) str1Counts.set(str, str1Counts.get(str) + 1);
        else str1Counts.set(str, 1);
    }

    for (let str of str2) {
        if (str2Counts.has(str)) str2Counts.set(str, str2Counts.get(str) + 1);
        else str2Counts.set(str, 1);
    }

    // 두 개의 문자열 길이가 같다는 가정이니까 한 개만 돌리기
    str1Counts.forEach((v, k) => {
        if (str2Counts.get(k) !== v) answer = 'NO';
    });

    return answer;
}

// 8. 모든 아나그램 찾기(해쉬, 투포인터, 슬라이딩 윈도우)
// S문자열에서 T문자열과 아나그램이 되는 S의 부분문자열의 개수를 구하기
// function solution8(s, t) {
//     let answer = 1;
//     const subS = new Map();
//     const subT = new Map();

//     for (let i = 0; i < t.length; i++) {
//         if (subT.has(t[i])) subT.set(t[i], subT[t[i]] + 1);
//         else subT.set(t[i], 1);

//         if (subS.has(s[i])) subS.set(s[i], subS.get[s[i]] + 1);
//         else subS.set(s[i], 1);
//     }

//     subT.forEach((v, k) => {
//         if (!subS.has(k) || v !== subS.get(k)) answer = 0;
//     });

//     // s문자열 for문으로 돌면서 부분문자열 알파벳 카운팅
//     for (let i = t.length; i < s.length; i++) {
//         const leftValue = subS.get(s[i - t.length]);
//         if (leftValue) {
//             if (leftValue - 1 > 0) subS.set(s[i - t.length], leftValue - 1);
//             else subS.delete(s[i - t.length]);
//         }

//         if (subS.has(s[i])) subS.set(s[i], subS.get(s[i]) + 1);
//         else subS.set(s[i], 1);

//         // t문자열에 a가 2개 있는 경우, s문자열 map에 이미 a가 1개 있는 경우 카운팅 되면 안 된다.
//         let isEqual = true;
//         for (const [key, value] of subT) {
//             if (subT.has(key) && value !== subS.get(key)) isEqual = false;
//         }

//         if (isEqual) answer++;
//     }

//     return answer;
// }
// chatgpt로 최적화 한 코드
function solution8(s, t) {
    let answer = 0;
    const tMap = new Map();
    const sMap = new Map();
    const tLen = t.length;

    for (const ch of t) {
        tMap.set(ch, (tMap.get(ch) || 0) + 1);
    }

    // tLen - 1 만큼 윈도우 구성, 밑에 반복문에서 추가하면서 비교할 것이기 때문
    for (let i = 0; i < tLen - 1; i++) {
        sMap.set(s[i], (sMap.get(s[i]) || 0) + 1);
    }

    let left = 0;
    for (let right = tLen - 1; right < s.length; right++) {
        sMap.set(s[right], (sMap.get(s[right]) || 0) + 1);

        if (compareMaps(sMap, tMap)) answer++;

        const leftChar = s[left];
        const leftVal = sMap.get(leftChar);
        if (leftVal === 1) sMap.delete(leftChar);
        else sMap.set(leftChar, leftVal - 1);
        left++;
    }

    return answer;
}

function compareMaps(map1, map2) {
    if (map1.size !== map2.size) return false;

    for (const [key, val] of map1) {
        if (map2.get(key) !== val) return false;
    }

    return true;
}

runTest('두 배열 합치기 #1', solution1, '1 2 3 3 5 6 7 9', parseInt(input1[0]), input1[1].split(' ').map(Number), parseInt(input1[2]), input1[3].split(' ').map(Number));
runTest('공통원소 구하기 #1', solution2, '2 3 5', parseInt(input2[0]), parseInt(input2[1]), input2[2].split(' ').map(Number), input2[3].split(' ').map(Number));
runTest('연속 부분수열1 #1', solution3, '3', parseInt(input3[0].split(' ')[0]), parseInt(input3[0].split(' ')[1]), input3[1].split(' ').map(Number));
runTest('연속 부분수열2 #1', solution4, '10', parseInt(input4[0].split(' ')[0]), parseInt(input4[0].split(' ')[1]), input4[1].split(' ').map(Number));
runTest('최대 매출 #1', solution5, '56', parseInt(input5[0].split(' ')[0]), parseInt(input5[0].split(' ')[1]), input5[1].split(' ').map(Number));
runTest('학급 회장(해쉬) #1', solution6, 'C', parseInt(input6[0]), input6[1].split(''));
runTest('아나그램(해쉬) #1', solution7, 'YES', input7_1[0], input7_1[1]);
runTest('아나그램(해쉬) #2', solution7, 'NO', input7_2[0], input7_2[1]);
runTest('모든 아나그램 찾기(해쉬, 투포인터, 슬라이딩 윈도우) #1', solution8, 3, input8[0], input8[1]);

