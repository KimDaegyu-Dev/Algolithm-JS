문제해결접근법(Problem Solving Approach)
    문제 해결 과정
        - Devise a plan for solving problems
        - Understand the problem
        - Explore concrete examples
        - Break it down
        - Solve/Simplify
        - Look back and refactor
        
        - 문제 해결을 위한 계획을 세우기
        - 문제 이해하기
        - 구체적인 예제 탐색
        - 문제 분해하기
        - 해결/단순화
        - 되돌아보고 리팩토링, 문제 복습

    Understand the problem(문제 이해하기)
        1. Can i restate the problem in my own words?
            문제를 내 방식으로 재정의할 수 있나요? 

        2. What are the inputs that go into the problem?
            문제에 들어가는 입력값은 무엇인가요?

        3. What are the outputs that should come from the solution to the problem?
            문제의 해결책으로 나와야 하는 출력값은 무엇인가요?
            문제에 대한 해결책에서 나타야할 결과는? 형태는?

        4. Can the outputs be determined from the inputs? In other words, do I have enough information to solve the problem?
            출력값을 입력값으로 결정할 수 있나요? 다시 말해, 문제를 해결할 충분한 정보가 있나요?

        5. How should I label the important pieces of data that are a part of the problem?
            문제의 일부인 중요한 데이터를 어떻게 레이블링 해야 하나요?
            -> 문제에서 정말 중요한 데이터는 무엇인가요?

        ex) Write a function which takes two numbers and returns their sum.
            1. Implement addition
            2. What are the inputs?
                - Integers?
                - Floats?
                - What about string for large numbers?
            3. What should the output be?
                - Int? 
                - Float? What if the sum is a decimal?
                - String? "8" + "7" = "87" or 8 + 7 = 15
            4. Can the outputs be determined from the inputs?
                만약 입력값이 문자열이라면? -> 정보가 부족함
                만약 입력값이 하나라면? -> 정보가 부족함
            5. How should I label the important pieces of data that are a part of the problem?
                - num1, num2, sum
    
    Explore concrete examples(구체적인 예제 탐색)
        예시를 알면
            - 문제를 이해하는데 도움이 됨
            - 구현한 작업을 확인 할 뿐만 아니라 예시를 적용하며 더 많은 정보 습득 가능
                -> Unit Test, User Stories
        단계
            1. Start with Simple examples
                입력값, 출력값 예시 두세개 작성
            2. Progress to more complex examples
                더 복잡한 예시로 발전
            3. Explore examples with empty inputs
                빈 입력값으로 예시 탐색
            4. Explore examples with invalid inputs
                잘못된 입력값으로 예시 탐색

    Break it down(문제 분해하기)
        문제를 작은 단위로 나누기
            - 작은 문제로 나누어 해결
            - 주석을 달아서 문제를 나누기
            - 나누어진 문제를 해결하면 원래 문제도 해결됨
    
    Solve/Simplify(해결/단순화)
        어려운 부분을 만나면 잠깐 무시하고 단순한 해결책을 작성한뒤 다시 돌아와서 어려운 부분을 해결
            - 단순한 해결책을 먼저 작성
            - 그 후에 어려운 부분을 해결
            - 어려운 부분을 해결하지 못하면 다시 단순화
        
    Look back and refactor(되돌아보고 리팩토링, 문제 복습)
        코드를 한 줄 씩 살펴보며 마음에 들지 않는 부분, 코드의 형태, 해석 방법, 가독성/효율성을 개선
        
        리팩토링 질문
            - Can you check the result? 결과를 확인 할 수 있나요?
            - Can you derive the result differently? 결과를 다르게 도출 할 수 있나요?
            - Can you understand it at a glance? 한 눈에 이해 할 수 있나요?
            - Can you use the result or method for some other problem? 결과나 방법을 다른 문제에 사용할 수 있나요?
            - Can you improve the performance of your solution? 해결책의 성능을 개선할 수 있나요?
            - Can you think of other ways to refactor? 다른 방법으로 리팩토링 할 수 있나요?
            - How have other people solved this problem? 다른 사람들은 이 문제를 어떻게 해결했나요?

문제 해결 패턴(Problem Solving Patterns)
    Master common problem solving patterns(일반적인 문제 해결 패턴을 익히기)

    - Frequency Counter(빈도 카운터)
        Object나 Set을 사용하여 값을 저장하고, 값을 비교하는 방법
        ex) 같은 문자열인지 확인, 같은 문자열이 몇개 있는지 확인
        주로 O(n^2)의 시간 복잡도를 가짐
        그 대신 각 배열에 한번 씩 루프를 적용하면 O(n)의 시간 복잡도를 가짐

    - Multiple Pointers(다중 포인터)
        배열이나 문자열과 같은 데이터 구조에서 여러 포인터를 사용하여 효율적인 방법으로 데이터를 탐색
        ex) 정렬된 배열에서 중복되는 값을 찾기
        효율적인 공간 복잡도를 가짐

    - Sliding Window(슬라이딩 윈도우)
        배열이나 문자열과 같은 데이터 구조에서 부분 데이터 집합을 탐색
        ex) 연속된 데이터 집합에서 가장 큰 값을 찾기
        O(n)의 시간 복잡도를 가짐

    - Divide and Conquer(분할 정복)
        ex) x의 n 제곱을 구하라 
            -> 나이브한 접근법 : x를 n번 곱함
            -> 짝수 일시 n/2의 제곱을 구하고 그것을 제곱  ex) 2^4 = 2^2 * 2^2
            -> 홀수 일시 n-1의 제곱을 구하고 그것에 n을 곱함 ex) 2^5 = 2^4 * 2

    - Dynamic Programming(동적 프로그래밍)

    - Greedy Algorithms(탐욕 알고리즘)

    - Backtracking(백트래킹)

    - Many more!
    