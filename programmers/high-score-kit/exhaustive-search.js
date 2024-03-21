// Lv.2 전력망을 둘로 나누기
// 실행시간이 마음에 들지않음, 나중에 개선 해보기
function solution1(n, wires) {
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

// Lv.2 모음사전
// 수학 공식으로 계산하면 편할 것 같다고 생각했는데 완전탐색 문제라서 직접 탐색해서 찾는 알고리즘으로 해야할 것 같음
// 다른 코드 참고해보니 단어 전체 조합 저장하고 일치하는 문자열 INDEX 가져옴
function solution2(word) {
    let answer = 0;
    
    let dictionary = [];
    const alphabets = [['A'], ['E'], ['I'], ['O'], ['U']];
    
    const initWord = "";
    const initIndex = 0;

    // 조합 가능한 단어들 저장
    dictionary = setDictionary(initWord, initIndex, dictionary, alphabets);
    dictionary.sort();
    
    // 단어와 일치하는 index 가져오기
    answer = dictionary.indexOf(word);
    
    return answer;
}
function setDictionary(initWord, initIndex, dictionary, alphabets) {
    dictionary.push(initWord);
    
    for (let i = 0; i < alphabets.length; i++) {
        if (initIndex < alphabets.length) {
            setDictionary(initWord + alphabets[i], initIndex + 1, dictionary, alphabets);
        }
    }

    return dictionary;
}
// [참고용] 위와 동일한 문제 다른 사람 풀이 (시간복잡도 차이 많이 난다. 이게 훨씬 낮음)
function refer(words) {
    return words.split('').reduce((r, c, i) => r + [781, 156, 31, 6, 1][i] * ['A', 'E', 'I', 'O', 'U'].indexOf(c) + 1, 0);
}
//