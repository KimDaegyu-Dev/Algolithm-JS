스택(Stack)
    후입선출 원칙을 따르는 데이터들의 모음
    Collection of the data and needs to bind by LIFO Principle
    
    스택이 사용되는곳
    - 프로그래밍 언어에서 함수 호출 관리(Managing function invoations)
    - Undo / Redo
    - Routing(the history object) is treated like a stack (브라우저, react router dom)
    어떤 것들의 기록, 즉 우리가 하는 것들을 저장할 때 사용

    BigO
    스택은 삽입과 삭제를 우선시함, 검색이나 탐색하고 싶다면 다른 구조를 사용
    Insertion - O(1)
    Removal - O(1)
    Searching - O(n)
    Access - O(n)

큐(Queue)
    선입선출 원칙을 따르는 데이터들의 모음
    Collection of the data and needs to bind by FIFO Principle

    큐가 사용되는 곳
    - 대기 큐
    - 컴퓨터의 백그라운드 작업
    - 업로딩 다운로딩
    - 프린트 큐
    - processing tasks

    BigO

    Insertion - O(1)
    Removal - O(1)
    Searching - O(n)
    Access - O(n)