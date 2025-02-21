
// K번째수
function solution(array, commands) {
    var answer = [];
    for(let command of commands){
        let newArr =[];
        newArr = array.slice(command[0]-1, command[1]);
        newArr = newArr.sort((a,b)=>a-b);
        answer.push(newArr[command[2]-1]);
    }
    return answer;
}
//다른 풀이
function solution(array, commands) {
    return commands.map(command => {
        const [sPosition, ePosition, position] = command
        const newArray = array
            .filter((value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1)
            .sort((a,b) => a - b)    

        return newArray[position - 1]
    })
//가장 큰 수

//H-Index
function solution(citations) {
    var answer = 0;
    citations.sort((a,b) => a-b);
    let max = 0;
    for(let j = 1; j<citations[citations.length-1]; j++){
        let biggerCnt = 0;
        let smallerCnt = 0;
        for(let i = 0; i < citations.length; i++){
            if(citations[i] >= j) biggerCnt++;
            else smallerCnt++;
        }
        // console.log(biggerCnt, smallerCnt, j);
        if(biggerCnt >= j && smallerCnt <= citations.length-biggerCnt){
            max = Math.max(max, j);
            // console.log(max);
        } 
    }
    return max;
}   // 6 5 3 1 0 : 3
    // 0 1 3 5 6 : 3
    // 0 0 0 4 10 : 3

//다른 풀이
function solution(citations) {
    citations = citations.sort(sorting);
    var h = 0;
    //내림차순으로 정렬된 배열에서 h+1 인덱스가 h번째로 큰 값보다 커지는 지점을 찾는다.
    while(h + 1 <= citations[h]){
        h++;
    }
    return h;


    function sorting(a, b){
        return b - a;
    }
}