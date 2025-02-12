function countDown(num){
    if(num<=0){
        console.log("All Done");
        return;
    }
    console.log(num);
    num--;
    countDown(num);
}

countDown(5);
//print 5
// countDown(4);
//print 4
// countDown(3);
// print 3
// countDown(2);
// print 2
// countDown(1);
// print 1
// countDown(0);
// All done