//아예 못 봄 ㅠㅠ
//프로그래머스 호텔 대실 문제와 비슷하다길래 이걸로 대체
//하 3시간 쯤 걸림, 힙으로 구현했다가 안돼서 결국 인터넷 보고 찾음
function solution(book_time) {
  var answer = 0;
  let bookTime = toMinute(book_time);
  let schedule = []; //각 방별 마지막 예약 시작 시간
  bookTime.sort((a, b) => a[0] - b[0]);
  bookTime.forEach(([startTime, endTime]) => {
    let needRoom = true;
    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i] + 10 <= startTime) {
        needRoom = false;
        schedule[i] = endTime;
        break;
      }
    }
    if (needRoom) schedule.push(endTime);
  });
  // console.log(schedule);
  answer = schedule.length;
  return answer;
}
function toMinute(book_time) {
  let result = book_time.map(([start, end]) => {
    let date = new Date("2024-01-01 00:00:00");
    let startDate = new Date("2024-01-01 00:00:00");
    let endDate = new Date("2024-01-01 00:00:00");
    startDate.setHours(start.substr(0, 2), start.substr(3));
    endDate.setHours(end.substr(0, 2), end.substr(3));
    let startMinute = (startDate - date) / (1000 * 60);
    let endMinute = (endDate - date) / (1000 * 60);
    return [startMinute, endMinute];
  });
  return result;
}
