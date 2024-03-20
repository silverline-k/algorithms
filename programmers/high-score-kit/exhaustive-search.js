// Lv.2 전력망을 둘로 나누기
// 실행시간이 마음에 들지않음, 나중에 개선 해보기
function solution(n, wires) {
    let answer = -1;

    const edgePairs = new Map();
    const checkedWires = [];

    // 송전탑 별 연결 정보 저장
    wires.forEach(([v1, v2]) => {
        const nodesV1 = edgePairs.get(v1);
        const nodesV2 = edgePairs.get(v2);

        if (nodesV1) edgePairs.set(v1, nodesV1.add(v2));
        else edgePairs.set(v1, new Set([v2]));

        if (nodesV2) edgePairs.set(v2, nodesV2.add(v1));
        else edgePairs.set(v2, new Set([v1]));
    });

    // edgePairs 순서대로 한 전력망 먼저 구하고
    // 다른 전력망은 공식으로 계산 후 송전탑 개수 차이 절대값 저장
    wires.forEach(([v1, v2]) => {
        const visitedNode = new Set();

        visitedNode.add(v1);
        visitedNode.add(v2);

        const nodesV1 = edgePairs.get(v1);
        const queue = [...nodesV1];

        let count = 1;

        while (queue.length) {
            const node = queue.pop();
            if (!visitedNode.has(node)) {
                visitedNode.add(node);
                queue.push(...(edgePairs.get(node)));
                count++;
            }
        }

        // 공식만 알면 다른 전력망 개수도 파악할 수 있음
        checkedWires.push(Math.abs(count * 2 - n));
    });

    answer = Math.min(...checkedWires);

    return answer;
}