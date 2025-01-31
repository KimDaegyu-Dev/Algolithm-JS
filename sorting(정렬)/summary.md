정렬이란 무엇인가?
    컬렉션(collection, ex.배열)의 항목을 재배열(rearranging)하는 과정을 정렬이라 함

정렬을 배워야하는 이유
    정렬이 프로그래밍에서 매우 흔하게 사용되기 때문
    데이터를 정렬할 방법은 많고 각 알고리즘에는 상황마다 장단점이 있음
        - 무작위 데이터에서는 힙, 병합 정렬등이 빠르고 삽입 정렬이 느리지만
        - 거의 정렬된 데이터에서는 삽입 정렬이 매우 빠름
    전형적인 면접 주제이기 떄문

목표 
    작동원리와 구현방법
    버블
    선택
    삽입
    --기본적인 알고리즘--

자바스크립트 기본 내장 정렬
    Array.sort();
        - 알파벳 순서로 정렬
        - 배열의 모든 항목이 문자열로 변환 후 문자의 유니코드 값으로 정렬
        -> 이상한 값으로 정렬됨

        -그러나 sort 메소드는 선택적 비교 함수(optional comparator function)를 인자로 전달받음
        -이 함수로 어떻게 우리가 정렬하고 싶은지 알려줄 수 있음
        -A와B라는 2개의 항목이 있는 구조로 작성함
        -반환되는 값을 토대로 만들 정렬 순서를 자바스크립트에 알림
        -음수 반환 시 a가 b 앞에 옴
        -양수면 반대
        -0이면 동일하게 취급하고 한번에 정렬 

버블 정렬(Bubble Sort)
    별로 효율적이지 않고 흔히 사용되지 않지만 두각을 나타내는 분야가 하나 있음(최적화된 버블 정렬은 거의 정렬된 배열에서 O(n)에 가까운 속력을 보여줌)
    버블 정렬이라 부르는 이유는 큰 값이 한ㅌ 턴마다 위쪽으로 밀려나는 모습이 버블이 올라오는거 같아서
    의사코드
    1.i라는 변수를 가지고 배열의 맨 끝에서 루프를 시작해서 맨 앞에서 끝남
    2.j라는 변수가 포함된 내부 루프가 i-1가 실행됨
    3.만약 arr[j]가 arr[j+1]보다 크다면 두 값을 교환
    4.정렬된 배열을 반환

선택 정렬(Selection Sort)
    큰 값을 배열 끝에 위치시키는 대신 진행하면서 최솟값을 값 선택하고 맨 앞에 배치함 
    버블정렬처럼 처음부터 끝까지 움직이지만, 실제 정렬된 데이터는 처음부터 누적됨
    최솟값 찾기 -> 맨 앞과 교환 -> 최솟값 찾기

    의사코드
    1.최솟값을 저장할 변수 생성 첫번째 항으로 지정
    2.다음 항목과 비교후ㅡ 다음 항목이 작다면 새로운 최솟값으로 지정
    3.배열의 끝까지 도달할때까지 최솟값을 찾고, 맨 앞 인덱스의 값과 바꿈
    4.만약 최솟값이 처음 시작한 인덱스의 값이 아니라면 둘의 값을 바꿈

    선택 정렬이 버블 정렬보다 나은 한가지 경우는 swap의 수를 최소화 할 때
    버블 정렬은 큰 값을 계속 스왑해나가며 정렬하지만 선택 정렬은 각 루프가 끝날때 한번만 스왑함

삽입 정렬(Insertion Sort)
    특정 상황에서는 많이 쓰이는 정렬 알고리즘
    선택된 요소의 왼쪽 배열에 점차적으로 요소를 삽입해 정렬을 하고 선탠된 요소의 왼쪽은 항상 정렬되어 있음
    따라서 하나씩 이동하거나, 한번에 가장 큰/작은 요소를 찾는 대신 각 요소를 정렬되어 있는 절반 속 해당되는 위치에 배치함

    의사코드
    1.배열의 2번째 요소를 선택해 시작함(첫번째 요소는 이미 정렬되어있다고 보기 때문에)
    2.선택한 요소와 앞에 있는 요소와 비교함 그리고 필요하면 스왑함
    3.다음 요소에 반복함, 만약 순서가 잘못되어 있다면 정렬되어있는 왼쪽 배열을 반복해서 올바른 순서에 배치함
    4.배열이 정렬될때까지 반복

    데이터가 거의 정렬되어 있을 때의 처리속도는 빠른편
    온라인 알고리즘이라는 데이터가 있는 경우, 데이터가 들어오는 대로 작동하는 알고리즘이 새로운 데이터를 수신하므로 전체 배열을 한번에 정렬할 필요가 없음
    예를 들어 온라인에서 실시간으로 번호를 제출하는 코드를 정렬해야한다면 삽입 정렬은 한번에 항목을 삽입하여 작동하기 때문에
    어떤 값이 들어와도 필요한 위치에 놓을 수 있음
    그래서 라이브, 스트리밍 방식으로 들어온 데이터를 즉시 입력해야하는 상황에 편함

기가막히게 빠른 병합 정렬(Merge Sort)
    목표
    버블, 선택, 삽입의 단점 -
    합병 퀵 기수 정렬 구현

병합 정렬(Merge Sort)
    1948년에 폰 노이만이 작성
    -분할, 정렬, 합병이 모두 동시에 일어남
    -0 또는 1개의 요소가 이미 정렬되어있다는 점을 이용함(ex.[], [1], [9])
    -배열을 더 작은 배열로 나누는 방식(분할 정복 Divide and Conquered)

        정렬된 배열 병합 방법
            정렬된 배열 두개의 조합을 반환
        1.정렬된 두 배열의 합병을 담당할 함수를 먼저 구현하는게 좋음
        2.정렬된 두 배열이 주어지면 1번의 헬퍼 함수는 마찬가지로 정렬된 새 배열을 만듦(당연히 입력 배열 두개에 있는 모든 요소를 포함해야하함)
        3.이 함수는 O(n+m) 시간과 O(n+m) 공간 복잡도로 실행되어야하고 매개변수로 주어진 배열을 수정해선 안됨

        의사코드
        1.입력 두 개를 취하는 함수를 정의하여 마지막에 반환할 빈 배열 생성, 각 입력 배열에서 가장 작은 값부터 시작
            카운터 i,j가 필요하고 While 루프 사용 추천
        2.i와 j가 각각의 배열 끝에 도달하지 않았다면 , 첫 번째 배열의 값으로 첫 번째 항목을 취한 다음 두 번째 배열의 첫 번째 항목 값과 비교함
            만약 첫 번째 항목이 더 작다면 결과 배열에 집어넣고 첫 번째 배열의 다음 항목으로 넘어감
            만약 두 번째 항목이 더 작다면 결과 배열에 집어넣고 두 번째 배열의 다음 항목으로 넘어감
            배열 하나를 완료한 경우에는 다른 배열의 남은 값을 모두 넣음(배열들이 같은 방식으로 정렬되어 있기 때문에 다 때려넣어도 괜춘)
    
    병합 정렬 의사코드
    1.배열의 요소가 1개 또는 0개가 될 때까지 배열을 계속 반으로 나눔 (arr.slice(0, arr.length/2))
    2.작은 배열이 준비되면 작성해 놓았던 합병 합수를 사용해 다시 정렬된 배열로 합칭, 전체 배열 길이로 돌아갈 때까지
    3.배열을 다시 합쳤으면 합병된 배열을 반환함


-----알고리즘의 비교-----
        시간복잡도 Best    Average    Worst     공간복잡도
버블    O(n)            O(n^2)      O(n^2)      O(1)
삽입    O(n)            O(n^2)      O(n^2)      O(1)
선택    O(n^2)          O(n^2)      O(n^2)      O(1)
병합    O(nlogn)        O(nlogn)    O(nlogn)    O(n)