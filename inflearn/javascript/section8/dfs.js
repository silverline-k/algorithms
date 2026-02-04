import { runTest } from '../../../test-helper.js';

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

runTest('이진트리순회 - 전위순회', preorder, '1 2 4 5 3 6 7', 1);
runTest('이진트리순회 - 중위순회', inorder, '4 2 5 1 6 3 7', 1);
runTest('이진트리순회 - 후위순회', postorder, '4 5 2 6 7 3 1', 1);
runTest('부분집합 구하기(DFS) #1', solution4, ['1 2 3', '1 2', '1 3', '1', '2 3', '2', '3'], 3);
