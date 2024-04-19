'use strict';

import * as level1 from './level1/code.js';

function main() {
    console.time('answer time');
    console.log(level1.calculateNumberOfPencils(178));
    console.timeEnd('answer time');
}

main();