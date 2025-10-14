import { runTest } from '../../../test-helper.js';
import fs from 'fs';

const input1 = fs.readFileSync('./inflearn/javascript/section4/input1.txt').toString().trim().split('\n');
const input2 = fs.readFileSync('./inflearn/javascript/section4/input2.txt').toString().trim().split('\n');
const input3 = fs.readFileSync('./inflearn/javascript/section4/input3.txt').toString().trim().split('\n');
const input4 = fs.readFileSync('./inflearn/javascript/section4/input4.txt').toString().trim().split('\n');
const input5 = fs.readFileSync('./inflearn/javascript/section4/input5.txt').toString().trim().split('\n');

// 1. 자릿수의 합
// 타입 변환해서 구현할 생각하지 말고 수학적으로 생각할 것
function solution1(_, arr) {
    let answer = Number.MIN_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    for (let num of arr) {
        let tmp = num;
        let sum = 0;

        // 자릿수 별로 더해야 하기 때문에 나머지가 0이 될 때까지
        // ex) 123 -> 123/10 = 12, 123%10 = 3
        //            12/10  =  1, 12%10  = 2
        while (tmp) {
            sum += tmp % 10;
            tmp = Math.floor(tmp / 10);
        }

        if (sum > max) {
            max = sum;
            answer = num;
        } else if (sum === max) {
            answer = num > answer ? num : answer;
        }
    }

    return answer;
}

function isPrime(num) {
    if (num < 2) return false;

    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }

    return true;
}

// 2. 뒤집은 소수
function solution2(_, arr) {
    const answer = [];

    // 내장함수 사용해서 타입 변환 후 reverse 할 경우 0.040125 ms
    // for (let num of arr) {
    //     let res = Number(num.toString().split('').reverse().join(''));
    //     if (isPrime(res)) answer.push(res);
    // }

    // 수학적으로 풀 경우 0.032958 ms
    for (let num of arr) {
        let rev = 0;

        while (num) {
            let tmp = num % 10;
            rev = rev * 10 + tmp;
            num = Math.floor(num / 10);
        }

        if (isPrime(rev)) answer.push(rev);
    }

    return answer.join(' ');
}

// 3. 멘토링 - 멘토,멘티가 되는 짝을 만들 수 있는 경우 몇 가지인지?
// M번의 수학테스트 등수를 가지고 멘토, 멘티 정함
// ex) 멘토A, 멘티B 로 짝이 됐을 때 A는 M번의 수학테스트에서 모두 B보다 등수가 앞서야 함
// function solution3(n, m, ranks) { // 학생 수, 수학테스트 횟수, 테스트 결과
//     let answer = 0;

//     // (1, 1), (1, 2) ... (4, 4)
//     for (let i = 1; i <= n; i++) {
//         for (let j = 1; j <= n; j++) {
//             let count = 0;

//             for (let k = 0; k < m; k++) {
//                 let pi = 0;
//                 let pj = 0;
//                 for (let s = 0; s < n; s++) {
//                     if (ranks[k][s] === i) pi = s;
//                     if (ranks[k][s] === j) pj = s;
//                 }
//                 if (pi < pj) count++;
//             }

//             if (count === m) answer++;
//         }
//     }

//     return answer;
// }

// 브루트포스 연습 문제여도 4중 반복문은 피하고자 아래와 같은 최적화 코드 참고 할 것
function solution3(n, m, ranks) {
    let answer = 0;

    // 1️⃣ pos[k][student] = k번째 테스트에서 student의 등수 인덱스
    const pos = Array.from({ length: m }, () => Array(n + 1).fill(0));

    for (let k = 0; k < m; k++) {
        for (let s = 0; s < n; s++) {
            pos[k][ranks[k][s]] = s;
        }
    }

    // 2️⃣ 모든 멘토(i), 멘티(j) 조합 검사
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (i === j) continue; // 자기 자신은 멘토/멘티 불가

            let isValid = true;
            for (let k = 0; k < m; k++) {
                if (pos[k][i] >= pos[k][j]) { // i가 j보다 등수가 뒤거나 같음
                    isValid = false;
                    break;
                }
            }

            if (isValid) answer++;
        }
    }

    return answer;
}

// 4. 졸업 선물
// 각자 원하는 상품 가격, 배송비 제출
// 현재 예산으로 최대 몇 명의 선물을 사줄 수 있는지 구하기
// 상품 하나를 50% 할인해서 살 수 있는 쿠폰 있음, 배송비는 x
function solution4(n, m, wishlist) {
    // 반복문 돌면서 한도까지 다 더해보기 (2중for문)
    // 할인율 적용하려면 while문 써야하나..? -> 애초에 할인된 금액으로 다 더해보는 방법이 있다는 것...
    let answer = 0;

    wishlist.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));

    for (let i = 0; i < n; i++) {
        let total = m - (Math.floor(wishlist[i][0] / 2) + wishlist[i][1]);
        let count = 1;

        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            total -= wishlist[j][0] + wishlist[j][1];
            if (total < 0) break;
            count++;
        }

        if (answer < count) answer = count;
    }

    return answer;
}

// 5. K번째 큰 수
// 1~100사이 자연수가 적힌 N장의 카드, 같은 숫자의 카드가 여러장 있을 수 있음
// 3장을 뽑아서 합한 값 기록, 뽑을 수 있는 모든 경우 기록
// 기록한 값 중 K번째 큰 값 찾기
function solution5(n, k, arr) {
    // 반복문 돌면서 다 더하고 정렬해서 index로 값 찾기
    // set에 넣고 배열로 만들어서 정렬하기 (중복 값 있어서)
    let answer = 0;
    let sums = new Set();

    for (let i = 0; i < n; i++) {
        let sum = arr[i];

        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            sum += arr[j];

            for (let k = 0; k < n; k++) {
                if (i === k || j === k) continue;
                sum += arr[k];
                sums.add(sum);
                sum -= arr[k];
            }

            sum -= arr[j];
        }
    }

    const sortedSumArr = [...sums].sort((a, b) => b - a);
    answer = sortedSumArr[k - 1];

    return answer;
}
// 5번 강의 풀이 (이게 더 실행속도 빠름)
// function solution5(n, k, arr) {
//     let answer = 0;
//     let sums = new Set();

//     // 총 3개 조합이라서 하나씩 더한 값으로 반복문 도는 듯
//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             for (let k = j + 1; k < n; k++) {
//                 sums.add(arr[i] + arr[j] + arr[k]);
//             }
//         }
//     }

//     const sortedSumArr = [...sums].sort((a, b) => b - a);
//     answer = sortedSumArr[k - 1];

//     return answer;
// }

runTest('자릿수의 합 #1', solution1, 137, input1[0], input1[1].split(' ').map(Number));
runTest('뒤집은 소수 #1', solution2, '23 2 73 2 3', input2[0], input2[1].split(' ').map(Number));
runTest('멘토링 #1', solution3, 3, parseInt(input3[0].split(' ')[0]), parseInt(input3[0].split(' ')[1]), input3.slice(1).map((v) => v.split(' ').map(Number)));
runTest('졸업선물 #1', solution4, 4, parseInt(input4[0].split(' ')[0]), parseInt(input4[0].split(' ')[1]), input4.slice(1).map((v) => v.split(' ').map(Number)));
runTest('K번째 큰 수', solution5, 143, parseInt(input5[0].split(' ')[0]), parseInt(input5[0].split(' ')[1]), input5[1].split(' ').map(Number));