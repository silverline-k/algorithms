// Lv.2 타겟 넘버
// 너무 복잡하게 풀을 생각하지 말고 문제를 다시 한 번 보자
// 근데 성능 별로 안 좋은 것 같음
function solution1(numbers, target) {
    let answer = 0;

    const length = numbers.length;

    const dfs = (count, sum) => {
        if (count === length) {
            if (sum === target) {
                answer++;
            }

            return;
        }

        dfs(count + 1, sum + numbers[count]);
        dfs(count + 1, sum - numbers[count]);
    }

    dfs(0, 0);

    return answer;
}

// Lv.3 네트워크
function solution2(n, computers) {
    let answer = 0;

    const checked = new Array(n).fill(0);

    const dfs = (computerNumber) => {
        checked[computerNumber] = 1;

        for (let j = 0; j < n; j++) {
            if (checked[j] === 0 && computers[computerNumber][j] === 1) {
                dfs(j);
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (checked[i] === 0) {
            dfs(i);

            answer++;
        }
    }

    return answer;
}


// Lv.3 여행경로
// 무조건 순서대로만 갔을 경우 모든 항공권 사용하지 않는 경우 발생함
function solution(tickets) {
    let answer = [];

    const airportInfo = new Map();

    // 출발 공항 별로 도착하는 공항들 순서대로 Map에 저장
    for (let i = 0; i < tickets.length; i++) {
        const [departure, arrival] = tickets[i];

        const airports = airportInfo.get(departure);

        if (airports) {
            airports.push(arrival);
            airportInfo.set(departure, [...airports.sort()]);
        } else {
            airportInfo.set(departure, [arrival]);
        }
    }

    const path = ['ICN'];

    while(path.length) {
        const departure = path[path.length - 1];

        const airports = airportInfo.get(departure);
        if (airports && airports.length > 0) {
            path.push(airports.shift());
            airportInfo.set(departure, airports);
        } else {
            // 제일 처음 ICN 제외하고 먼저 들어간 경우 경로 끊겨있는 경우일 수 있음 그래서 리턴할 때 역정렬해야 함
            // [["ICN", "D"], ["D", "ICN"], ["ICN", "B"]] 케이스 고려해서 구현해야 함
            answer.push(path.pop());
        }
    }

    return answer.reverse();
}
