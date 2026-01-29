import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input10 = fs.readFileSync('inflearn/javascript/section7/input10.txt').toString().trim().split('\n');

// 10. 이분검색
// 임의의 N개의 숫자 입력으로 주어짐, 오름차순으로 정렬하기
// N개의 수 중 한 개의 수인 M이 주어지면 이분검색으로 M이 정렬된 상태에서 몇 번째에 있는지 구하기(중복값 존재X)
// input: 자연수 N(3<=N<=1000000), M, N개의 수로 이루어진 정수형 배열
// output: 정렬 후 M의 값의 위치 번호
function solution10(n, target, arr) {
    let answer;
    // 명확하게 범위 설정하기
    let lt = 0;
    let rt = arr.length - 1;

    arr.sort((a, b) => a - b);

    while (lt <= rt) {
        // 중간값 정확하게 계산하기
        let mid = parseInt((lt + rt) / 2);

        if (arr[mid] === target) {
            answer = mid + 1;
            break;
        }

        // 범위 축소
        else if (arr[mid] > target) rt = mid - 1;
        else lt = mid + 1;
    }

    return answer;
}

runTest('이분검색 #1', solution10, 3, parseInt(input10[0].split(' ')[0]), parseInt(input10[0].split(' ')[1]), input10[1].split(' ').map(Number));
