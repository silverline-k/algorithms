// 문제 13501: 퇴사
import { runTest } from '../../test-helper.js';

function solution(n, schedule) { // time, pay
    let answer = 0;

    // 수익 저장
    const dp = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        const [time, pay] = schedule[i];
        if (i + time > n) continue;

        dp[i] = dp[i] + pay;

        for (let j = i + time; j < n; j++) {
            dp[j] = Math.max(dp[j], dp[i]);
        }
    }

    answer = Math.max(...dp);

    return answer;
}

runTest('solution', solution, 45, 7, [[3,10], [5,20], [1,10], [1,20], [2,15], [4,40], [2,200]]);
