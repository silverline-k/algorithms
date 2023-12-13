// Lv.1 K번째수
function solution1(array, commands) {
    var answer = commands.map(([firstIndex, lastIndex, targetIndex]) => {
        const arr = array.slice(firstIndex-1, lastIndex);
        arr.sort((a, b) => a - b);
        
        return arr[targetIndex-1];
    });  
    return answer;
}
