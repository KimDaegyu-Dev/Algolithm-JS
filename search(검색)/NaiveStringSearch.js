function naiveStringSearch(long, short){
    let count = 0;
    // let index = 0;
    // while(index < str.length){
    //     for(let i = 0; i< input.length; i++){
    //         if(str[index]!==input[i]) {
    //             break;
    //         }
    //         if(i=== input.length && str[index]===input[i]){
    //             count++;
    //         }
    //         index++;
    //     }
    //     console.log(count);
    // }
    // return count;
    for(let i=0;i<long.length; i++){
        for(let j=0;j<short.length; j++){
            if(short[j]!==long[i+j]) break;
            if(j==short.length-1) count++;
        }
    }   
    console.log(count);
    return count;
    
}
naiveStringSearch("abcabc", "abc");