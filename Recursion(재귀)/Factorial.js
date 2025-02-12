function factorial(num){
    //반복
    // let total = 1;
    // for(let i = num; i>1; i--){
    //     total*=i;
    // }
    // return total;
    //재귀
    if(num===1) return 1;
    return num * factorial(num-1);
}