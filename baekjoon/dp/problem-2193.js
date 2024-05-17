// 문제 2193: 이친수
import { runTest } from '../../test-helper.js';

function solution(n) {
    const dp = new Array(n).fill(0);

    dp[0] = 1;
    let answer = 1;    

    for (let i = 1; i < n; i++) {
        if (i === 1) {
            answer++;
            continue;
        }
    }

    return answer;
}

runTest('solution #1', solution, 2, 3);
runTest('solution #2', solution, 3, 4);
