// 피보나치 수열
function fibonacci(n) {
    if( n<=2 ) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}

//memoization O(n), 10000번째 피보나치 수열을 구할 때, 콜스택이 터짐
function fibonacciMemo(n, memo = [undefined, 1, 1]) {
    if(memo[n] !== undefined) return memo[n];
    let result = fibonacciMemo(n-1, memo) + fibonacciMemo(n-2, memo);
    memo[n] = result;
    return result;
}
//tabulation O(n), 공간복잡도가 더 좋음
function fibonacciTab(n) {
    if(n<=2) return 1;
    let fibNums = [0, 1, 1];
    // for(let i = 3; i <= n; i++){
    //     fibNums[i] = fibNums[i-1] + fibNums[i-2];
    // }
    while(fibNums.length <= n){
        fibNums.push(fibNums[fibNums.length-1] + fibNums[fibNums.length-2]);
    }
    return fibNums[n];
}