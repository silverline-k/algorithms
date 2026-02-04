import fs from 'fs';
import { runTest } from '../../../test-helper.js';

const input5 = fs.readFileSync('inflearn/javascript/section8/input5.txt').toString().trim().split('\n');

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

runTest('이진트리순회 - 전위순회', preorder, '1 2 4 5 3 6 7', 1);
runTest('이진트리순회 - 중위순회', inorder, '4 2 5 1 6 3 7', 1);
runTest('이진트리순회 - 후위순회', postorder, '4 5 2 6 7 3 1', 1);
runTest('부분집합 구하기(DFS) #1', solution4, ['1 2 3', '1 2', '1 3', '1', '2 3', '2', '3'], 3);
runTest('합이 같은 부분집합(DFS: 아마존 인터뷰) #1', solution5, 'YES', parseInt(input5[0]), input5[1].split(' ').map(Number));
