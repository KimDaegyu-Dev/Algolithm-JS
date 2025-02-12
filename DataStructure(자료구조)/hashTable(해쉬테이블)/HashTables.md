해쉬테이블(Hash Table, Hash Map)이란
    key-value 값을 저장하는데 쓰임 
    배열과 달리, key에 순서가 없음
    배열보다 다음 과 같은 연산이 더 빠름
        값 찾기, 새 값 추가, 값 제거
    
    파이썬에는 Dictionaries, Java, Go, Scala에는 Maps, Ruby에는 Hashes
    JS에는 Objects와 Map
    Objects는 스트링만을 키로 사용 가능, Map은 키에 제한이 없음
    
    해쉬 함수
        key를 숫자로 변환해서 인덱스로 쓰고, value를 배열에 저장하는 것
        이를 수행하는 함수를 hash function이라함
        key가 같으면 항상 같은 값을 반환해야함
        
        해쉬함수는 입력값의 크기를 측정해서 고정된 크기(같은 자릿수)의 출력값을 내보냄
        단방향으로만 생성해냄 -> 출력값을 바탕으로 입력값을 생성할 수 없음


    좋은 해쉬 알고리즘(필수요소)
        1.Fast - 빠름(constant time)
        2.Uniformly Distributes Value - 일관된 방식으로 분배를 해서 다른 것들과 겹치지 않게 해야함
        3.Deterministic - 결정론적임, 같은 입력값은 항상 같은 출력값이어야함, 불확실하면 안됨

    충돌 발생 과정
        아무리 배열이 크고 좋은 해쉬 함수여도 충돌은 일어남
    충돌 발생 시 처리 방법
        Separate Chaining(개별 체이닝))
            같은 인덱스에 여러 데이터를 저장 할 때, 배열이나 연결리스트 같은 것을 활용하여 이중 데이터 구조를 사용하는 것
        Linear Probing(직선 탐색법)
            충돌이 발생하면 다음 빈칸이 어디인지 확인하고 그곳에 저장함

    Set 의사코드
    1.key와 value를 받음
    2.key를 해쉬함
    3.키와 값을 개별 체이닝 방식으로 해쉬 테이블에 저장

    Get 의사코드
    1.key를 받음
    2.키를 해쉬함
    3.해쉬 테이블의 인덱스에 해당하는 자리로 가서 값 반환
    4.만약 키가 없다면 undefined 반환

    key/value 의사코드
    1.해쉬 테이블을 루프돌아서 모든 키/값을 반환

    BigO
    average
    Insert - O(1)
    Deletion - O(1)
    Acces - O(1)