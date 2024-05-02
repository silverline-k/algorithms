import { runTest } from "../test-helper.js";

function convertDecimalToBinary(decimal) {
    let answer = '';

    const dfs = (number) => {
        if (number === 0) {
            return;
        } else {
            const quotient = Math.floor(number / 2);
            const remainder = number % 2;

            dfs(quotient);

            answer += remainder.toString();
        }
    }

    dfs(decimal);

    return Number(answer);
}

runTest('convertDecimalToBinary #1', convertDecimalToBinary, 1011, 11);
runTest('convertDecimalToBinary #2', convertDecimalToBinary, 10111, 23);
runTest('convertDecimalToBinary #3', convertDecimalToBinary, 1111000, 120);

// 부분집합 구하기
function generateSubsets(number) {
    const answer = [];

    // 원소 포함 여부
    const inclusionList = new Array(number).fill(0);

    const dfs = (num) => {
        if (num > number) {
            let elements = [];

            for (let i = 0; i < inclusionList.length; i++) {
                if (inclusionList[i]) {
                    elements.push(i + 1);
                }
            }

            if (elements.length > 0) {
                answer.push(elements);
            }
        } else {
            inclusionList[num - 1] = 1;
            dfs(num + 1)
            inclusionList[num - 1] = 0;
            dfs(num + 1);
        }
    };

    dfs(1);

    return answer;
}

runTest('generateSubsets #1', generateSubsets,
    [
        [1, 2, 3],
        [1, 2],
        [1, 3],
        [1],
        [2, 3],
        [2],
        [3]
    ],
    3
)