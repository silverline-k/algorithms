// Lv.1 완주하지 못한 선수
function solution1(participant, completion) {
    let answer = '';
    
    const completionNamesCount = new Map();
    
    completion.forEach(name => {
        const count = completionNamesCount.get(name);
        if (count) {
            completionNamesCount.set(name, count + 1);
        } else {
            completionNamesCount.set(name, 1);
        }
    });
    
    participant.forEach(name => {
        const count = completionNamesCount.get(name);
        if (count > 1) {
            completionNamesCount.set(name, count - 1);
        } else if (count === 1) {
            completionNamesCount.delete(name);
        } else {
            answer = name;
        }
    });
    
    return answer;
}

// Lv.1 폰켓몬
function solution2(nums) {    
    // MAX(N/2, num of different numbers)
    // stack!
    const len = nums.length;
    let stack = [], i = -1;
    while(++i < len){
        if (stack.indexOf(nums[i]) === -1){
            stack.push(nums[i]);
            if(stack.length === len/2) return len/2;
        } 
    }
    return stack.length; 
}

// Lv.2 전화번호 목록
function solution3(phoneBook) {
    return !phoneBook.sort().some((t,i)=> {
        if(i === phoneBook.length -1) return false;

        return phoneBook[i+1].startsWith(phoneBook[i]);        
    })
}

// Lv.2 의상
// 매일 다른 옷 조합
function solution4(clothes) {
    let answer = 1;
    
    const typeCount = new Map();

    clothes.forEach(cloth => {
        const type = cloth[1];
        const count = typeCount.get(type);
        
        if (count != null) {
            typeCount.set(type, count + 1);
        } else {
            typeCount.set(type, 1);
        }
    });
    
    const keyList = Array.from(typeCount.keys());
    
    keyList.forEach(key => {
         answer *=typeCount.get(key) + 1;
    });
    
    return answer - 1;
}

// Lv.3 베스트앨범
function solution5(genres, plays) {
    let answer = [];
    
    const genrePlayTotalCounts = new Map();
    const genrePlayCounts = new Map();
    
    for (let i = 0; i < genres.length; i++) {
        const totalCount = genrePlayTotalCounts.get(genres[i]);
        genrePlayTotalCounts.set(genres[i], (totalCount || 0) + plays[i]);
        
        let count = genrePlayCounts.get(genres[i]);
        if (count == null) count = [];
        genrePlayCounts.set(genres[i], [...count, `${plays[i]}:${i}`],);
    }
    
    const descTotalCounts = Array.from(genrePlayTotalCounts.entries()).sort((a, b) => b[1] - a[1]);
    descTotalCounts.forEach(([key, value]) => {
        // 내림차순 정렬할 때 동일하면 index순서대로
        const counts = genrePlayCounts.get(key);
        counts.sort((a, b) => {
            const aCount = Number(a.split(':')[0]);
            const bCount = Number(b.split(':')[0]);
            
            if (aCount > bCount) return -1;
            else if (aCount < bCount) return 1;
            else {
                const aIndex = a.split(':')[1];
                const bIndex = b.split(':')[1];
                if (aIndex < bIndex) return -1;
                else if (aIndex > bIndex) return 1;
                else return 0;
            }
        });
        
        for (let i = 0; i < counts.length; i++) {
            if (i === 2) return;
            answer.push(Number(counts[i].split(':')[1]));
        }
    });
    
    return answer;
}
