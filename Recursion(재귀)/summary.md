목표
    재귀가 무엇이고 어떻게 사용하는지 
    재귀 함수에서 꼭 포함되어야 하는 두가지 요소(Base Case, Different Input)
    콜 스택의 시각화
    helper method recursion과 pure recursion

    재귀란 무엇인가?
        자기 자신을 호출하는 절차,  동일한 함수(자기자신)를 게속 호출
        A process(function in our case) that calls itself 

    재귀 함수의 필수 요소
        Base Case - 함수의 종료 조건
        Different Input - 매 호출마다 다른 입력값
    
    통상적인 재귀 함수 작성 시 실수하는 것들
        No Base Case
        잘못 된 값을 반환하거나, 애초애 반환하는 것을 잊음 (return을 주의하자! 반환은 재귀의 토대)

    Helper Method 재귀 패턴 
        지금까지 작성했던 팩토리얼 같은 함수는 단일 단독 함수였음(single standalone function)
        스스로 재귀를 함, 함수를 외부에서 호출하면 직접 자체 코드 내의 함수를 호출함
        헬퍼 메소드 함수는 2개의 함수가 있음, 메인 외부 함수는 개발자인 우리가 외부에서 호출함
        우리는 외부 함수를 호출해서 무언가를 내부로 전달 할 수 있음.
        외부 함수 안에는 내부함수가 호출되고 재귀적으로 자신을 호출함
        배열이나 데이터 목록, 배열과 비슷한 데이터 구조를 컴파일(compile) 해야할 때 흔히 이렇게 작업함 
        예를 들어 단일 단독 재귀함수는 배열에 있는 값이 매 호출마다 초기화되기 때문에 데이터를 수집할 수 없는데
        이 패턴을 통해 해결 가능
        단순히 타뷸레이션(tabulation)을 하는게 아님
        rerturn 재귀적이지 않은 외부 함수가 재귀적인 내부 함수를 호출하는 것
        ```js
            function outer(input){
                var outerScopedVariable = []
                function helper(helperInput){
                    //modify the outerScopedVariable
                    helper(helperInput--)
                }
                helper(input)
                return outerScopedVarialbe;
            }
        ```
    Pure Method 재귀 패턴
        모든 재귀 문제는 Pure 패턴으로 해결 가능하지만 Helper 메소드를 더 선호

        배열을 사용 시 배열을 복사하는 slice, spread 연산자, concat 같은 메소드를 사용할 수 있음, 
        그러면 함수가 배열의 카피를 만들기 때문에 배열을 변경할 필요가 없음
        배열을 합치거나 제거하는 방식으로 외부의 데이터 구조에 데이터를 저장하지 않고 해결 가능(결과를 축적할 수 있음)

        문자열은 immutable(변경불가)이기 때문에 slice, substr, substring을 사용해서 사본을 만들어야함 

        객체의 경우, Object.assign이나 spread 연산자를 사용하는게 유용