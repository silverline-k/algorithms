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

runTest('이진트리순회 - 전위순회', preorder, '1 2 4 5 3 6 7', 1);
runTest('이진트리순회 - 중위순회', inorder, '4 2 5 1 6 3 7', 1);
runTest('이진트리순회 - 후위순회', postorder, '4 5 2 6 7 3 1', 1);
