import { runTest } from "../../../test-helper.js";

// 네트워크 선 자르기(Bottom-Up)
// 1m, 2m의 길이를 갖는 선으로 네트워크 선 자르기
function cutNetworkCable(n) {
    const dyList = new Array(n).fill(0);

    // 직관적으로 알 수 있는 값은 미리 초기화 해주기
    dyList[0] = 1;
    dyList[1] = 2;

    // f(n) = f(n-1) + f(n-2)
    for (let i = 2; i < n; i++) {
        dyList[i] = dyList[i - 1] + dyList[i - 2];
    }

    return dyList[n - 1];
}

runTest('cutNetworkCable #1', cutNetworkCable, 21, 7);
runTest('cutNetworkCable #2', cutNetworkCable, 1836311903, 45);
