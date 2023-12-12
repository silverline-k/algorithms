// Lv.3 가장 먼 노드
function solution1(n, edge) {
    const queue = [1];
    const visitedNodes = new Array(n+1).fill(false);
    const levels = new Array(n+1).fill(0);
    
    visitedNodes[1] = true;

    while(queue.length) {
        const head = queue.shift();
        const level = levels[head] + 1; 
        
        for(let node of edge) {
            if (node[0] === head && visitedNodes[node[1]] === false) {
                visitedNodes[node[1]] = true;
                levels[node[1]] = level;
                queue.push(node[1]);
            } else if (node[1] === head && visitedNodes[node[0]] === false) {
                visitedNodes[node[0]] = true;
                levels[node[0]] = level;
                queue.push(node[0]);
            }
        }
    }
    
    const maxLevel = Math.max(...levels);
    return levels.filter((v) => v === maxLevel).length;
}

// Lv.3 순위
function solution2(n, results) {
    let answer = 0;
    
    // 승리 패배 구분 할 수 있게 값 줘야 함
    // 승리: 1, 패배: -1, 누락: 0
    const matrix = Array.from({length: n}, () => new Array(n).fill(0));
    for (let [u, v] of results) {
        matrix[u-1][v-1] = 1;
        matrix[v-1][u-1] = -1;
    }
        
    // k = 거쳐가는 노드
    for (let k = 0; k < n; k++) {
        // i = 출발 노드
        for (let i = 0; i < n; i++) {
            // j = 도착 노드
            for (let j = 0; j < n; j++) {
                if (matrix[i][j] === 0) {
                    if (matrix[i][k] === 1 && matrix[k][j] === 1) {
                        matrix[i][j] = 1;
                        matrix[j][i] = -1;
                    } else if (matrix[i][k] === -1 && matrix[k][j] === -1) {
                        matrix[j][i] = 1;
                        matrix[i][j] = -1;
                    }   
                }
            }
        }
    }
    
    // 배열 순회하면서 자기 자신 빼고 0 없는 애들 카운트하고 리턴하기
    for (let i = 0; i < n; i++) {
        let unrank = false;
        
        for (let j = 0; j < n; j++) {
            if (i !== j && matrix[i][j] === 0) {
                unrank = true;
            }
        }
        
        if (unrank === false) {
            answer++;
        }
    }
    
    return answer;
}

// Lv.5 방의 개수
// README: 다른 풀이 보면 오일러 다면체 정리 활용해서 풀었음
function solution3(arrows) {
    let answer = 0;
    
    // x, y축은 arrows로 체크해야 함
    const graph = new Map([['0,0', true]]);
    const visitedEdgeList = new Set(['0,0-0,0']);
    
    let x = 0;
    let y = 0;
    let currX = 0;
    let currY = 0;
    
    const weightX = [0, 1, 1, 1, 0, -1, -1, -1];
    const weightY = [1, 1, 0, -1, -1, -1, 0, 1];
    
    // arrows대로 좌표 방문 체크
    arrows.forEach(arrow => {
        // 대각선 교차 체크하기 위해선 이동거리 2로 설정
        for (let i = 0; i < 2; i++) {
            x += weightX[arrow];
            y += weightY[arrow];
            
            const coordinate = x.toString() + ',' + y.toString();
            const visitedCoordinate = graph.get(coordinate);
            const visitedEdge = visitedEdgeList.has(`${currX},${currY}-${x},${y}`);

            if (visitedCoordinate) {
                if (!visitedEdge) {
                    answer++;
                }
            }
            
            graph.set(coordinate, true);
            visitedEdgeList.add(`${currX},${currY}-${x},${y}`);
            visitedEdgeList.add(`${x},${y}-${currX},${currY}`);
            currX = x;
            currY = y;
        }
    });
    
    return answer; // 방의 갯수
}