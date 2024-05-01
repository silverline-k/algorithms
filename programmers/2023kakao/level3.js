// // 문제: 표현 가능한 이진트리
// // 이진수로 만들어서 저장하고 포화 이진트리 상태로 만들어지는지 확인
// function solution(numbers) {
//     let answer = [];

//     for (let i = 0; i < numbers.length; i++) {
//         let binary = '';
//         let quotient = numbers[i];

//         // 1. 십진수 -> 이진수 변환 (앞자리 0까지 포함)
//         while(quotient) {
//             binary = (quotient % 2).toString() + binary;
//             quotient = Math.floor(quotient / 2);
//         }

//         // 포화 이진트리에 맞게 짝수인 경우 앞자리 0 붙여줌
//         if (binary.length % 2 === 0) {
//             binary = '0' + binary;
//         }

//         // index 2로 계속 나눴을 때 몫을 index로 했을 때 0이면 부모노드 0이니까 만들 수 없음
//         let isImpossible = false;
//         for (let j = 0; j < binary.length; j++) {
//             // 부모 노드가 0인 경우
//             if (j % 2 !== 0 && binary[j] === '0') {
//                 // 루트노드가 0이면 불가능
//                 if (j === Math.floor(binary.length / 2)) {
//                     isImpossible = true;
//                 } else {
//                     // 부모노드, 자식노드 다 0인 경우를 제외하고 부모노드 0인 경우 불가능
//                     if (j - 1 >= 0 && j + 1 < binary.length && binary[j + 1] !== '0' && binary[j - 1] !== '0') {
//                         isImpossible = true;
//                     }
//                 }
//             }

//             if (isImpossible) {
//                 break;
//             }
//         }

//         if (isImpossible) {
//             answer.push(0);
//         } else answer.push(1);
//     }

//     return answer;
// }

// solution([7, 42, 5]);


// 문제: 표현 가능한 이진트리
// 이진수로 만들어서 저장하고 포화 이진트리 상태로 만들어지는지 확인
function solution(numbers) {
    let answer = [];

    for (let i = 0; i < numbers.length; i++) {
        let binary = '';
        let quotient = numbers[i];

        // 1. 십진수 -> 이진수 변환 (앞자리 0까지 포함)
        while(quotient) {
            binary = (quotient % 2).toString() + binary;
            quotient = Math.floor(quotient / 2);
        }

        // 포화 이진트리에 맞게 짝수인 경우 앞자리 0 붙여줌
        if (binary.length % 2 === 0) {
            binary = '0' + binary;
        }

        let isPossible = check(binary);

        answer.push(isPossible ? 1 : 0);
    }

    return answer;
}

function check(binary) {
    const length = binary.length;
    if (length === 1) return true;

    const mid = Math.floor(length / 2);
    if (binary[mid] === '0' && binary.includes('1')) return false;

    return check(binary.substr(0, mid)) && check(binary.substr(mid + 1));
}

solution([7, 42, 5]);
// solution([7]);
