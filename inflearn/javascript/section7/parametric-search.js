import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input10 = fs.readFileSync('inflearn/javascript/section7/input10.txt').toString().trim().split('\n');
const input11 = fs.readFileSync('inflearn/javascript/section7/input11.txt').toString().trim().split('\n');
const input12 = fs.readFileSync('inflearn/javascript/section7/input12.txt').toString().trim().split('\n');

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

// 11. 뮤직비디오(결정알고리즘-기본 이분검색으로 풂)
// DVD에 총 N개의 곡 들어감, 녹화할 때 라이브 순서 그대로 유지 되어야 함
// M개의 DVD에 모든 동영상을 녹화하기로 함, DVD의 크기(녹화 가능한 길이) 최소로 하고픔
// M개의 DVD는 모두 같은 크기여야 함
// input: n(1<=n<=1000), m(1<=m<=n), 라이브 곡 순서대로 곡 길이 분단위 배열 (곡 길이는 10000분이하)
// output: DVD 최소 용량 크기
function solution11(n, m, arr) {
    let answer = 0;

    // DVD 용량 범위 설정
    let lt = Math.max(...arr);
    let rt = arr.reduce((a, b) => a + b, 0);

    while (lt <= rt) {
        // DVD 한 장의 용량
        let mid = parseInt((lt + rt) / 2);
        // 계속해서 최소 용량 찾기
        if (getCount(arr, mid) <= m) {
            answer = mid;
            rt = mid - 1;
        } else lt = mid + 1;
    }

    return answer;
}
// 결정 알고리즘은 답이 유효한지 확인하는 함수가 제일 중요
function getCount(songs, capacity) {
    let count = 1; // DVD 장 수
    let sum = 0; // 누적 용량

    for (let song of songs) {
        if (sum + song > capacity) {
            count++;
            sum = song;
        } else sum += song;
    }

    return count;
}

// 12. 마구간 정하기(결정알고리즘)
// n개의 마구간 수직선상에 있음, x1,x2,x3,...xN의 좌표를 가짐, 마구간간에 좌표 중복x
// c마리의 말 갖고있음, 말들은 서로 가까이 있는 것을 좋아하지 않음, 각 마구간에는 한 마리의 말만
// 가장 가까운 두 말의 거리가 최대가 되게 말을 마구간에 배치하고픔
// c마리의 말을 n개의 마구간에 배치했을 때 가장 가까운 두 말의 거리가 최대가 되는 최댓값 출력
// input: n(3<=n<=200000), c(2<=c<=n), 마구간 좌표 xi(0<=xi<=1000000000)
// output: 가장 가까운 두 말의 최대 거리
function solution12(n, c, arr) {
    let answer = 0;

    arr.sort((a, b) => a - b);

    let low = 1;
    let high = arr[arr.length - 1];

    // 범위 구하기
    while (low <= high) {
        let count = 1;
        let endpoint = arr[0]; // 방금 전 말을 배치한 마구간 좌표 저장, 좌표 비교하기 위함
        let mid = parseInt((low + high) / 2);

        for (let i = 1; i < n; i++) {
            // 방금 전에 들어간 말의 마구간 좌표와 현재 마구간 좌표의 차이가 크거나 같아야 함
            if (arr[i] - endpoint >= mid) {
                endpoint = arr[i];
                count++;
            }
        }

        // 마릿수 충족하는지 확인하고 범위 다시 지정
        if (count < c) high = mid - 1;
        else {
            answer = mid;
            low = mid + 1;
        }
    }

    return answer;
}

runTest('이분검색 #1', solution10, 3, parseInt(input10[0].split(' ')[0]), parseInt(input10[0].split(' ')[1]), input10[1].split(' ').map(Number));
runTest('뮤직비디오(결정알고리즘) #1', solution11, 17, parseInt(input11[0].split(' ')[0]), parseInt(input11[0].split(' ')[1]), input11[1].split(' ').map(Number));
runTest('마구간 정하기(결정알고리즘) #1', solution12, 3, parseInt(input12[0].split(' ')[0]), parseInt(input12[0].split(' ')[1]), input12[1].split(' ').map(Number));
