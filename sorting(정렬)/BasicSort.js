function numberCompare(num1,num2){
    return num2 - num1;
}

[6,5,16,10].sort(numberCompare);

function compaerByLen(str1, str2){
    return str2.length - str1.length;
}

["Steele", "Colt", "Data Structures", "Algorithms"].sort(compaerByLen);