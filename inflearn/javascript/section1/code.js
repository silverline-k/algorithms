"use strict";
import { runTest } from '../../../test-helper.js';

// 1. 세 수 중 최솟값
export function getMinValue(a, b, c) {
  let min = a;

  if (min >= b) min = b;
  if (min >= c) min = c;

  return min;
}

// 2. 삼각형 판별
export function answerIfCanMakeTriangle(a, b, c) {
  let answer = "no";
  let max = a;
  const total = a + b + c;

  if (max <= b) max = b;
  if (max <= c) max = c;

  if (total - max > max) answer = "yes";

  return answer;
}

// 3. 연필 개수
export function calculateNumberOfPencils(studentsNum) {
  let pencilsNum = parseInt(studentsNum / 12);

  if (studentsNum % 12 !== 0) pencilsNum++;

  return pencilsNum;
}

// 4. 1부터 N까지 합 출력하기
// 1부터 N까지의 합 출력 (N<=20)
function solution4(n) {
  let answer = 0;

  for (let i = 1; i < n + 1; i++) {
    answer += i;
  }

  return answer;
}

// 5. 최솟값 구하기
function solution5(arr) {
  let answer = 0;
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (min > arr[i]) min = arr[i];
  }

  answer = min;

  return answer;
}

// 6. 홀수
// input: 자연수 7개 (100보다 작고 홀수가 한 개 이상 반드시 존재)
// output: 홀수들의 합 출력, 홀수들 중 최솟값 출력
function solution6(arr) {
  let sum = 0;
  let min = 100;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      sum += arr[i];
      if (min > arr[i]) min = arr[i];
    }
  }

  return [sum, min].join('\n');
}

runTest('1부터 N까지 합 출력하기 #1', solution4, 21, 6);
runTest('최솟값 구하기 #1', solution5, 2, [5, 3, 7, 11, 2, 15, 17]);
runTest('홀수 #1', solution6, '256\n41', [12, 77, 38, 41, 53, 92, 85]);
