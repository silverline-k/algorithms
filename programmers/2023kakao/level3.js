// 문제: 표현 가능한 이진트리
// 이진수로 만들어서 저장하고 포화 이진트리 상태로 만들어지는지 확인
// 문제 파악은 생각보다 빨리 끝났는데 생각하지도 못한 곳에서 걸렸었음 확인을 잘하자
function solution(numbers) {
    let answer = [];

    for (let i = 0; i < numbers.length; i++) {
        // 십진수 -> 이진수 변환
        let binary = numbers[i].toString(2);

        // 짝수일 때 0 붙이지 말고 공식을 활용하자...
        // 포화 이진트리 노드 개수 구하기 위한 변수
        let n = binary.length;
        let m = n.toString(2).length
        // 포화 이진트리 아닌 경우 더미노드 추가
        binary = '0'.repeat(2**m-1 - n) + binary;

        answer.push(check(binary) ? 1 : 0);
    }

    return answer;
}

function check(binary) {
    const mid = Math.floor(binary.length / 2);
    if (mid === 0) return true;

    // 부모 노드가 0일 때
    if (binary[mid] === '0') {
        // 자식 노드까지 다 0인 경우 true
        if (binary.indexOf('1') === -1) return true;
        else return false;
    }

    return check(binary.substring(0, mid)) && check(binary.substring(mid + 1));
}
