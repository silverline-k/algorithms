// 하노이의 탑
function solution(n) {
    let answer = [];

    const move = (remain, from, to, tmp) => {
        if (remain === 1) {
            answer.push([from, to]);
            return;
        }

        move(remain - 1, from, tmp, to);
        answer.push([from, to]);
        move(remain - 1, tmp, to, from);
    }

    move(n, 1, 3, 2);

    return answer;
}

