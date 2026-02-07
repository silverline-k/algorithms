import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input5 = fs.readFileSync('inflearn/javascript/section8/input5.txt').toString().trim().split('\n');
const input6 = fs.readFileSync('inflearn/javascript/section8/input6.txt').toString().trim().split('\n');
const input7 = fs.readFileSync('inflearn/javascript/section8/input7.txt').toString().trim().split('\n');

// 3. 이진트리 순회(깊이우선탐색)
// 이진트리 전위순회, 중위순회, 후위순회 출력
//      1
//    /   \
//   2     3
//  / \   / \
// 4   5 6   7
// 강의에선 재귀함수 호출할 때 인수 1로 넘김
function preorder(vertex) {
    let answer = [];
    function dfs(v) {
        if (v > 7) return;
        answer.push(v);
        dfs(v * 2);
        dfs(v * 2 + 1);
    }

    dfs(vertex);
    return answer.join(' ');
}

function inorder(vertex) {
    let answer = [];
    function dfs(v) {
        if (v > 7) return;
        dfs(v * 2);
        answer.push(v);
        dfs(v * 2 + 1);
    }

    dfs(vertex);
    return answer.join(' ');
}

function postorder(vertex) {
    let answer = [];
    function dfs(v) {
        if (v > 7) return;
        dfs(v * 2);
        dfs(v * 2 + 1);
        answer.push(v);
    }

    dfs(vertex);
    return answer.join(' ');
}

// 4. 부분집합 구하기(DFS)
// 자연수 N(1<=N<=10)이 주어지면 1부터 N까지의 원소를 갖는 집합의 부분집합 모두 출력(공집합 제외)
function solution4(n) {
    let answer = [];
    let check = Array.from({ length: n }, () => 0);

    // 제일 작은 숫자부터 출력해야 함
    function dfs(v) {
        if (v > n) {
            let tmp = '';
            for (let i = 0; i < n; i++) {
                if (check[i] === 1) tmp += `${i + 1} `;
            }
            if (tmp.length) answer.push(tmp.trim());
            return;
        }
        check[v - 1] = 1;
        dfs(v + 1);
        check[v - 1] = 0;
        dfs(v + 1);
    }

    dfs(1);
    return answer;
}

// 5. 합이 같은 부분집합(DFS: 아마존 인터뷰)
// N개의 원소로 구성된 자연수 집합을 두 개의 부분집합으로 나누었을 때
// 두 부분집합의 원소의 합이 서로 같은 경우가 존재하면 'YES' 출력, 그렇지 않으면 'NO' 출력
// 둘로 나뉘는 두 부분집합은 서로소 집합(Disjoint Set) = 공통 원소가 하나도 없는 두 개 이상의 잡합
// input: 자연수 n(1<=n<=10), 집합의 원소 배열 (원소 중복x, 크기 <=1000000)
// 내 풀이: 모든 경우의 수 구하고 check배열에 0과 1로 두 부분집합 구분하고 합 비교
// 강의 풀이: 원소 전체 합 구하고 재귀함수 통해서 더한 값과 비교
function solution5(n, set) {
    let answer = 'NO';
    let isSuccess = false;
    const total = set.reduce((prev, v) => prev + v, 0);
    function dfs(level, sum) {
        if (isSuccess) return;
        if (level === n) {
            if (sum === (total - sum)) {
                answer = 'YES';
                isSuccess = true;
            }
            return;
        } else {
            dfs(level + 1, sum + set[level]);
            dfs(level + 1, sum);
        }
    }

    dfs(0, 0);
    return answer;
}

// 6. 바둑이 승차(DFS)
// 바둑이들 트럭에 태우고 시장에 가려고 할 때, C킬로그램 넘게는 탑승 불가
// N마리의 바둑이와 각 바둑이의 무게 W가 주어지면, 트럭에 태울 수 있는 가장 무거운 무게 구하기
// input: C(1<=C<=100000000), N(1<=N<=30), n마리의 바둑이 무게 정수형 배열
// output: 가장 무거운 무게
function solution6(c, n, arr) {
    let answer = 0;

    // 모든 경우의 수에 맞게 더 하고
    // 현재 킬로그램과 제한 킬로그램 초과했는지 확인하고 큰값 비교 후 할당
    function dfs(level, sum) {
        if (sum > c) return;
        if (level === n) {
            if (sum > answer) {
                answer = sum;
            }
        } else {
            dfs(level + 1, sum + arr[level]);
            dfs(level + 1, sum);
        }
    }
    dfs(0, 0);

    return answer;
}

// 7. 최대점수 구하기(DFS)
// 선생님이 주신 N개의 문제를 풀 때 각 문제 풀었을 때 얻는 점수와 푸는데 걸리는 시간 주어짐
// 제한시간 M안에 N개의 문제 중 최대점수 얻을 수 있도록 해야 함 - 해당 문제는 해당시간이 걸리면 푸는 걸로 간주, 한 유형당 한개만 풀 수 있음)
// input: 문제의 개수 n(1<=n<=20), 제한 시간 m(10<=m<=300), 문제 풀었을 때 점수 - 걸리는 시간 배열
// ouput: 제한 시간 안에 얻을 수 있는 최대 점수
function solution7(n, m, arr) {
    let answer = 0;

    // 모든 경우의 수 더하기
    // 제한시간 초과되면 return
    // 문제 점수 큰 값 저장
    function dfs(level, totalTime, totalScore) {
        if (totalTime > m) return;
        if (level === n) {
            if (totalScore > answer) {
                answer = totalScore;
            }
        } else {
            dfs(level + 1, totalTime + arr[level][1], totalScore + arr[level][0]);
            dfs(level + 1, totalTime, totalScore);
        }
    }
    dfs(0, 0, 0);

    return answer;
}

runTest('이진트리순회 - 전위순회', preorder, '1 2 4 5 3 6 7', 1);
runTest('이진트리순회 - 중위순회', inorder, '4 2 5 1 6 3 7', 1);
runTest('이진트리순회 - 후위순회', postorder, '4 5 2 6 7 3 1', 1);
runTest('부분집합 구하기(DFS) #1', solution4, ['1 2 3', '1 2', '1 3', '1', '2 3', '2', '3'], 3);
runTest('합이 같은 부분집합(DFS: 아마존 인터뷰) #1', solution5, 'YES', parseInt(input5[0]), input5[1].split(' ').map(Number));
runTest('바둑이 승차(DFS) #1', solution6, 242, parseInt(input6[0].split(' ')[0]), parseInt(input6.shift().split(' ')[1]), input6.map(Number));
runTest('최대점수 구하기(DFS) #1', solution7, 41, parseInt(input7[0].split(' ')[0]), parseInt(input7.shift().split(' ')[1]), input7.map(v => v.split(' ').map(Number)));
