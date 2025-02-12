class HashTable{
    constructor(size = 53){
        this.keyMap = new Array(size);
    }

    _hash(key){
        let total = 0;
        let WEIRD_PRIME = 31;
        for(let i = 0; i < Math.min(key.length, 100); i++){
            let char = key[i]
            let value = char.charCodeAt(0) - 96;
            total = (total*WEIRD_PRIME+value)%this.keyMap.length; 
        }
        return total;
    }
    get(key){
        let hashKey = this._hash(key);
        let keyMap = this.keyMap;
        if(!keyMap[hashKey]) return undefined;
        for(let i = 0 ; i < keyMap[hashKey].length; i++){
            if(keyMap[hashKey][i][0]===key){
                return this.keyMap[hashKey][i][1];
            }
        }
    }
    set(key, val){
        let hashKey = this._hash(key);
        let keyMap = this.keyMap;

        if(!keyMap[hashKey]){
            keyMap[hashKey] = [];
        }
        keyMap[hashKey].push([key,val])
    }
    keys(){
        let keys = [];
        let keyMap = this.keyMap;

        for(let i = 0; i < keyMap.length; i++){
            if(keyMap[i]){
                for(let j = 0; j < keyMap[i].length; j++){
                    if(!values.includes(keyMap[i][j][0])) keys.push(keyMap[i][j][0]);
                }
            }
        }
        return keys;
    }
    values(){
        let values = [];
        let keyMap = this.keyMap;

        for(let i = 0; i < keyMap.length; i++){
            if(keyMap[i]){
                for(let j = 0; j < keyMap[i].length; j++){
                    if(!values.includes(keyMap[i][j][1])) values.push(keyMap[i][j][1]);
                }
            }
        }
        return values;
    }
}
hash("pink");
hash("pnik");
hash("pnki");