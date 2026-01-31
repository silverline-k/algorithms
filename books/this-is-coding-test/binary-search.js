import { runTest } from "../../test-helper.js";

/**
 * 문제: 떡볶이 떡 만들기 (난이도 2/3)
 * input:
 *  - n: 떡의 개수 (1<=n<=1000000)
 *  - m: 요청 떡의 길이 (1<=m<=2000000000)
 *  - arr: 떡의 개별 높이 (총합은 항상 m이상이라 손님이 필요한 양만큼 떡 사갈 수 있음, 0<=떡높이<1000000000)
 * output:
 *  - 적어도 m만큼의 떡을 집에 가져가기 위해 절단기에 설정할 수 있는 높이의 최댓값
 * 조건을 만족할 수 있는지 범위 up and down -> Parametric Search(최적화 문제를 결정문제('Yes' or 'No')로 바꾸어 해결하는 기법, 이 문제는 이진탐색으로 풂)
*/
function cutRiceCake(n, m, arr) {
    let answer = 0;

    arr.sort((a, b) => a - b);

    let low = 1;
    let high = arr[arr.length - 1];

    // 범위 설정하기
    while (low <= high) {
        let total = 0;
        let mid = parseInt((low + high) / 2);
        for (const h of arr) {
            // 잘린 떡의 길이 더하기
            if (h > mid) total += h - mid;
        }

        // 떡의 양이 부족한 경우 더 많이 자르기 (왼쪽 부분 탐색)
        // 절단기 높이가 낮을 수록 잘린 떡의 길이 길어짐
        if (total < m) high = mid - 1;
        else {
            answer = Math.max(answer, mid); // 최대한 덜 잘랐을 때가 정답이므로, 여기에서 결과 기록
            low = mid + 1;
        }
    }

    return answer;
}

runTest('떡볶이 집 떡 만들기 #1', cutRiceCake, 15, 4, 6, [19, 15, 10, 17]);