### fs 모듈을 이용한 I/O
```javascript
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const inputArr = arr.map(v => v.split(' ').map(Number));

function solution() {

}

solution();
```
