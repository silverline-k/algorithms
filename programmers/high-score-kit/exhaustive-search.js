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

// Lv.1 모의고사
// 무식하게 다 저장하지 말고 머리를 쓰자
function solution3(answers) {
    let answer = [];

    // 수포자 녀석들 찍는 패턴 배열에 저장
    const patterns = ["12345", "21232425", "3311224455"]; // 1, 2, 3

    // 초기 점수 세팅 1, 2, 3
    const scores = [0, 0, 0];

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === Number(patterns[0][i % patterns[0].length])) scores[0] += 1;
        if (answers[i] === Number(patterns[1][i % patterns[1].length])) scores[1] += 1;
        if (answers[i] === Number(patterns[2][i % patterns[2].length])) scores[2] += 1;
    }

    const highScore = Math.max(...scores);
    scores.forEach((score, index) => {
        if (highScore === score) answer.push(index + 1);
    });

    return answer;
}

// Lv.2 소수찾기
// 완전탐색 알고리즘 나올 때 무조건 while문 사용하려고 하지 말고 재귀함수 먼저 생각하기
function solution4(numbers) {
    let answer = 0;
    
    // 모든 숫자 조합 만드는 재귀 함수로 소수 일 때 set에 추가
    const primeNumbers = generatePrimeNumbers("", numbers, new Set());
    console.log(primeNumbers);

    answer = primeNumbers.size;
    
    return answer;
}
function checkPrimeNumber(number) {
    if (number <= 1) return false;

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }

    return true;
}
function generatePrimeNumbers(initNum, numbers, primeNumbers) {
    if (initNum.length > 0) {
        // 에라토스테네스의 체 공식 사용해서 소수 찾기
        const number = Number(initNum);
        const isPrime = checkPrimeNumber(number);
        if (isPrime) {
            primeNumbers.add(number);
        }
    }

    for (let i = 0; i < numbers.length; i++) {
        const combination = initNum + numbers[i];
        const other = numbers.substring(0, i) + numbers.substring(i + 1);

        generatePrimeNumbers(combination, other, primeNumbers);
    }

    return primeNumbers;
}
//

// Lv.2 피로도
// 다른 사람 코드 참고했음
// 탐험, 경로탐색 같은 문제는 방문 여부 확인 필요
function solution4(k, dungeons) { // 현재 피로도, [[최소 필요 피로도, 소모 피로도]]
    let answer = 0; // 최대 던전 수
    
    const visitedList = new Array(dungeons.length).fill(0);

    const dfs = (fatigue, count, visitedList) => {
        answer = Math.max(answer, count);

        for (let i = 0; i < dungeons.length; i++) {
            if (visitedList[i] === 0 && fatigue >= dungeons[i][0]) {
                visitedList[i] = 1;
                dfs(fatigue - dungeons[i][1], count + 1, visitedList);
                visitedList[i] = 0;
            }
        }
    }

    dfs(k, 0, visitedList);

    return answer;
}

// Lv.1 최소직사각형
// 문제를 잘 읽고 분석하자. 이상한 방법으로 풀다가 다른 사람 풀이 봤음
// 세로 길이보다 가로 길이가 더 길다고 가정할 때
function solution(sizes) {
    let maxWidth = 0;
    let maxHeight = 0;
    
    for (let i = 0; i < sizes; i++) {
        const h = Math.max(sizes[i][0], sizes[i][1]);
        const w = Math.min(sizes[i][0], sizes[i][1]);
        
        maxHeight = Math.max(maxHeight, w);
        maxWidth = Math.max(maxWidth, h);
    }
    
    return maxHeight * maxHeight;
}