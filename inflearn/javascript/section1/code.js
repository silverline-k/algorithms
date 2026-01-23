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

runTest('1부터 N까지 합 출력하기 #1', solution4, 21, 6);