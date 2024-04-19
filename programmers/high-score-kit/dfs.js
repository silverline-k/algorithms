// Lv.2 타겟 넘버
// 너무 복잡하게 풀을 생각하지 말고 문제를 다시 한 번 보자
// 근데 성능 별로 안 좋은 것 같음
function solution(numbers, target) {
    let answer = 0;

    const length = numbers.length;

    const dfs = (count, sum) => {
        if (count === length) {
            if (sum === target) {
                answer++;
            }

            return;
        }

        dfs(count + 1, sum + numbers[count]);
        dfs(count + 1, sum - numbers[count]);
    }

    dfs(0, 0);

    return answer;
}
