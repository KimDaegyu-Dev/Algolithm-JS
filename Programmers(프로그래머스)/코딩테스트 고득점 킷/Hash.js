// 폰켓몬
// N마리 중 N/2마리
// 같은 종류, 같은 번호
// 가장 많은 종류 고르기
// 1. Set을 이용한 풀이
function solution(nums) {
  let max = 0;
  let set = new Set(nums);
  return Math.min(set.size, Math.floor(nums.length / 2));
}
// 2. Object를 이용한 풀이
function solution(nums) {
  const select = nums.length / 2;
  const check = nums.reduce((total, cur) => {
    total[cur] ? total[cur]++ : (total[cur] = 1);
    return total;
  }, {});
  const checkLeng = Object.keys(check).length;
  return checkLeng > select ? select : checkLeng;
}
// 3. Stack을 이용한 풀이
function solution(nums) {
  // MAX(N/2, num of different numbers)
  // stack!
  const len = nums.length;
  let stack = [],
    i = -1;
  while (++i < len) {
    if (stack.indexOf(nums[i]) === -1) {
      stack.push(nums[i]);
      if (stack.length === len / 2) return len / 2;
    }
  }
  return stack.length;
}

// 완주하지 못한 선수
//동명이인 구분해야함
function solution(participant, completion) {
  let map = new Map();
  for (par of participant) {
    let parVal = map.get(par);
    map.set(par, parVal ? ++parVal : 1);
  }
  for (com of completion) {
    let comVal = map.get(com);
    if (comVal === 1) map.delete(com);
    else map.set(com, --comVal);
  }
  return [...map.keys()][0];
}
//다른 풀이
function solution(participant, completion) {
  const map = new Map();

  for (let i = 0; i < participant.length; i++) {
    let a = participant[i],
      b = completion[i];

    map.set(a, (map.get(a) || 0) + 1);
    map.set(b, (map.get(b) || 0) - 1);
  }

  for (let [k, v] of map) {
    if (v > 0) return k;
  }

  return "nothing";
}

//전화번호 목록
function solution(phone_book) {
  const hashSet = new Set();
  const phoneLength = new Set();
  phone_book.sort((a, b) => a - b);

  for (let phone of phone_book) {
    for (let length of phoneLength) {
      const prefix = phone.substring(0, length);
      if (hashSet.has(prefix)) {
        return false;
      }
    }
    phoneLength.add(phone.length);
    hashSet.add(phone);
  }

  return true;
}
//다른 풀이
function solution(phoneBook) {
  return !phoneBook.sort().some((t, i) => {
    if (i === phoneBook.length - 1) return false;

    return phoneBook[i + 1].startsWith(phoneBook[i]);
  });
}
function solution(phoneBook) {
  for (let number of phoneBook) {
    let reg = RegExp("^" + number);
    let count = phoneBook.filter((t) => reg.test(t));
    if (count.length > 1) return false;
  }
  return true;
}
//의상
//요구사항 : 서로 다른 옷의 조합의 수 구하기
//입력값 : [의상이름, 의상의 종류] 의 배열
//출력 값 : 가능한 의상의 조합 수를 반환
//의상 수는 1~30개 : 배열의 길이는 1~30
//같은 의상 이름은 없음
//문자열은 1~20인 자연수,알파벳 소문자,'_'
//종류 별로 의상 1개만 착용
//각 조합에는 최소 1개 이상의 의상이 있어야함
function solution(clothes) {
  //의상 종류를 객체의 키로 저장, 의상 이름을 배열 값으로 저장
  let clothesHash = new Map();
  for (let [name, type] of clothes) {
    if (!clothesHash.has(type)) {
      clothesHash.set(type, []);
    }
    clothesHash.get(type).push(name);
  }
  //객체 키 루프
  let answer = 1;
  for (let [key, arr] of clothesHash) {
    //의상 배열의 길이 + 이 의상 종류를 안입었을 때
    answer *= arr.length + 1;
  }
  //다 안입었을 가능성 제거
  answer -= 1;
  return answer;
}
//다른 풀이
function solution(clothes) {
  return (
    Object.values(
      clothes.reduce((obj, [name, type]) => {
        obj[type] = obj[type] ? obj[type] + 1 : 1;
        return obj;
      }, {})
    ).reduce((a, b) => a * (b + 1), 1) - 1
  );
}

//베스트앨범
//요구사항 : 장르, 재생 횟수를 기준으로 고유번호 배열 반환
//입력값 : 인덱스가 고유번호, genres, plays
//출력값 : 고유번호를 배열로 반환
//장르당 2곡 수록 가능
function solution(genres, plays) {
  var answer = [];
  let bestAlbum = {};
  genres.forEach((genre, i) => {
    if (!bestAlbum[genre]) bestAlbum[genre] = [i];
    else bestAlbum[genre].push(i);
  });
  //장르별 많이 재생된 곡 순으로 정렬
  //재생횟수가 같다면 고유번호가 낮은 노래가 앞으로
  for (let [genre, iArr] of Object.entries(bestAlbum)) {
    bestAlbum[genre] = iArr.sort((a, b) => plays[b] - plays[a]);
  }

  //많이 재생된 장르 순으로 정렬
  let mostGenres = Object.entries(bestAlbum).sort(
    (a, b) =>
      b[1].reduce((acc, i) => acc + plays[i], 0) - // 이 장르의 모든 재생횟수
      a[1].reduce((acc, i) => acc + plays[i], 0)
  );
  //[ [ 'pop', [ 4, 1 ] ], [ 'classic', [ 3, 0, 2 ] ] ]
  for (genre of mostGenres) {
    answer.push(...genre[1].slice(0, 2));
  }
  return answer;
}

//둘이 같을 때 테스트
// solution(["classic", "pop", "classic", "classic", "pop"], [500, 600, 500, 800, 2500])

//다른 풀이
function solution(genres, plays) {
  const count = {};
  let answer = [];
  const acc = genres.reduce((a, c, i) => {
    count[c] ? count[c].push([i, plays[i]]) : (count[c] = [[i, plays[i]]]);
    return a.set(c, a.get(c) ? a.get(c) + plays[i] : plays[i]), a;
  }, new Map());

  [...acc]
    .sort((a, b) => b[1] - a[1])
    .map((v) => {
      answer = answer.concat(
        count[v[0]].sort((c, d) => d[1] - c[1]).slice(0, 2)
      );
    });
  return answer.map((v) => v[0]);
}
