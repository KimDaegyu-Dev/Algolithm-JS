//숫자 문자열과 영단어
// 2021 카카오 채용연계형 인턴십
function solution(s) {
  var answer = 0;
  if (!s.match(/[a-z, A-Z]/)) return Number(s);
  const number = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  number.forEach((eng, idx) => (s = s.replaceAll(eng, idx)));
  return Number(s);
}

function solution(s) {
  let numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  var answer = s;

  for (let i = 0; i < numbers.length; i++) {
    let arr = answer.split(numbers[i]);
    answer = arr.join(i);
  }

  return Number(answer);
}

// [1차] 비밀지도
// 2018 KAKAO BLIND RECRUITMENT
function solution(n, arr1, arr2) {
  var answer = [];

  const fullMap = arr1.map((el, idx) =>
    (el | arr2[idx]).toString(2).padStart(n, 0)
  );
  fullMap.forEach((row, idx) => {
    let line = "";
    row.split("").forEach((el, idx) => {
      if (el === "1") {
        line = line.concat("#");
      } else {
        line = line.concat(" ");
      }
    });
    answer.push(line);
  });
  return answer;
}

function solution(n, arr1, arr2) {
  return arr1.map((v, i) =>
    addZero(n, (v | arr2[i]).toString(2)).replace(/1|0/g, (a) =>
      +a ? "#" : " "
    )
  );
}

const addZero = (n, s) => {
  return "0".repeat(n - s.length) + s;
};

// [1차] 캐시

function solution(cacheSize, cities) {
  var answer = 0;
  const cache = [];

  cities.forEach((city) => {
    city = city.toLowerCase();
    const index = cache.indexOf(city);

    if (index !== -1) {
      // cache hit
      cache.splice(index, 1);
      cache.push(city);
      answer += 1;
    } else {
      // cache miss
      if (cache.length >= cacheSize && cacheSize > 0) {
        cache.shift();
        cache.push(city);
      }
      if (cache.length < cacheSize && cacheSize > 0) {
        cache.push(city);
      }
      answer += 5;
    }
  });

  return answer;
}

function solution(cacheSize, cities) {
  const map = new Map();
  const cacheHit = (city, map) => {
    map.delete(city);
    map.set(city, city);
    return 1;
  };
  const cacheMiss = (city, map, size) => {
    if (size === 0) return 5;
    map.size === size && map.delete(map.keys().next().value);
    map.set(city, city);
    return 5;
  };
  const getTimeCache = (city, map, size) =>
    (map.has(city.toLocaleLowerCase()) ? cacheHit : cacheMiss)(
      city.toLocaleLowerCase(),
      map,
      size
    );
  return cities
    .map((city) => getTimeCache(city.toLocaleLowerCase(), map, cacheSize))
    .reduce((a, c) => a + c, 0);
}

// map.keys().next().value 작동 방식 상세 설명:
// map.keys()
// → Map의 keys iterator를 반환합니다.
// → 예: ['a', 'b', 'c']라는 순서로 키가 들어있다면, map.keys()는 그 순서대로 순회할 수 있는 **이터레이터(iterator)**를 제공합니다.

// map.keys().next()
// → 이터레이터의 next()를 호출하면, { value: 'a', done: false } 형태의 객체를 반환합니다.
// → 이 중 'a'는 맵에 가장 먼저 추가된 키입니다.

// .value
// → 위 결과에서 value를 꺼냅니다. 즉, map.keys().next().value는 가장 오래된 키를 의미합니다.

// 예시
// javascript
// 복사
// 편집
// const map = new Map();
// map.set('a', 1);
// map.set('b', 2);
// map.set('c', 3);

// console.log(map.keys().next().value); // 'a'
// 이는 Map이 삽입 순서를 유지하는 자료구조이기 때문에 가능한 일입니다.

// 그래서 왜 쓰냐?
// LRU 캐시에서 캐시가 꽉 찼을 때 가장 오래된 항목을 제거해야 하므로,

// javascript
// 복사
// 편집
// map.delete(map.keys().next().value);
// 를 통해 가장 먼저 추가된 키를 제거하는 것입니다.

// 도움이 되었나요?

// 나의 말:
// map.keys()[0] 이렇게 해도 되는거 아니야?

// ChatGPT의 말:
// 좋은 시도지만, 아쉽게도 map.keys()[0]는 동작하지 않습니다. 이유를 설명드릴게요.

// 🔍 이유: map.keys()는 배열이 아니라 이터레이터
// javascript
// 복사
// 편집
// const map = new Map();
// map.set('a', 1);
// map.set('b', 2);

// console.log(map.keys());
// // 출력: MapIterator { 'a', 'b' }
// map.keys()는 **배열(Array)**이 아니라 **이터레이터(iterator)**입니다.

// 이터레이터는 배열처럼 [] 인덱싱을 지원하지 않습니다.
// 즉, map.keys()[0] → undefined

// ✅ 올바르게 배열처럼 다루는 방법
// 만약 배열처럼 쓰고 싶다면, 스프레드 문법이나 Array.from()을 사용해야 해요:

// javascript
// 복사
// 편집
// [...map.keys()][0]           // 'a'
// Array.from(map.keys())[0]    // 'a'
// 그러나 LRU 캐시에서 가장 오래된 항목을 단 한 번 꺼내기만 한다면,
// **map.keys().next().value**가 가장 빠르고 메모리 효율적인 방식입니다.
// (배열로 만들면 모든 키를 복사해야 해서 오버헤드가 생깁니다.)

// 요약
// 표현	결과	설명
// map.keys()	이터레이터	배열 아님
// map.keys()[0]	undefined	인덱싱 불가능
// [...map.keys()][0]	'첫 키'	가능, 하지만 메모리 복사 발생
// map.keys().next().value	'첫 키'	✅ 가장 효율적인 방식
