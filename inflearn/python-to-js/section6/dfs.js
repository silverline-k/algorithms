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
