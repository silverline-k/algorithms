// Lv.1 체육복
// 순서 중요함
function solution(n, lost, reserve) {
    const lostSet = new Set(lost.sort().filter(num => !reserve.includes(num)));
    const reserveSet = new Set(reserve.sort().filter(num => !lost.includes(num)));

    lostSet.forEach(number => {
        if (reserveSet.has(number - 1)) {
            lostSet.delete(number);
            reserveSet.delete(number - 1);
        } else if (reserveSet.has(number + 1)) {
            lostSet.delete(number);
            reserveSet.delete(number + 1);
        }
    });

    return n - lostSet.size;
}