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
        const result = soluctionFunc(...args);
        assert.strictEqual(result, expectedResult);
        console.log(`${testName}: Success!`);
    } catch (error) {
        console.error(`${testName}: ${error.message}`);
    }
}
