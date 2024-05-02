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

// 합이 같은 부분집합
function checkEqualSubsetSums(n, elements) {
    let answer = 'NO';

    const totalSum = elements.reduce((prev, curr) => prev + curr, 0);

    const dfs = (index, sum) => {
        // 더 추가될 부분집합의 합이 다른 부분집합의 합보다 클 경우 더이상 더해서 비교할 필요 없음
        if (sum > totalSum - sum) return;

        if (index === n) {
            if (sum === totalSum - sum) {
                answer = 'YES';
            }

            return;
        }

        dfs(index + 1, sum + elements[index]); // elements[index] 부분집합 포함
        dfs(index + 1, sum); // elements[index] 부분집합 미포함
    };

    dfs(0, 0);

    return answer;
}

runTest('checkEqualSubsetSums #1', checkEqualSubsetSums, 'YES', 6, [1, 3, 5, 6, 7, 10]);
runTest('checkEqualSubsetSums #2', checkEqualSubsetSums, 'NO', 9, [3, 6, 13, 11, 7, 16, 34, 23, 12]);
runTest('checkEqualSubsetSums #3', checkEqualSubsetSums, 'YES', 10, [3, 6, 9, 13, 11, 7, 16, 34, 23, 12]);
