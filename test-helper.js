import assert from 'assert';

/**
 * @param {string} testName - 테스트케이스 이름
 * @param {Function} soluctionFunc - 테스트 진행할 함수
 * @param {*} expectedResult - 함수 예상 결과
 * @param {...*} args - 함수에 전달할 값
 * @returns {void}
*/
export function runTest(testName, soluctionFunc, expectedResult, ...args) {
    try {
        const startTime = process.hrtime();

        const result = soluctionFunc(...args);

        const endTime = process.hrtime(startTime);
        const duration = endTime[0] * 1000 + endTime[1] / 1000000;

        if (typeof expectedResult === 'object') {
            assert.deepStrictEqual(result, expectedResult);
        } else {
            assert.strictEqual(result, expectedResult);
        }

        console.log(`${testName}: Success! (${duration} ms)`);
    } catch (error) {
        console.error(`${testName}: ${error.message}`);
        console.trace();
    }
}
