BigO
필요성
각 문제에는 엄청나게 많은 해결법이 존재함
어떤 해결법이 가장 좋은지 판단하기 위해 필요
코드를 일반적으로 비교, 평가하는 방법
ex) 1..N까지 더하는 함수 sum1(for 반복문)과 sum2(수학적 공식)가 있을 때, 어떤 함수가 더 좋은지 판단

    시간 측정의 문제점
        기기 사양에 따라, 현재 실행중인 것들에 따라 시간이 달라질 수 있음
        따라서, 시간을 측정하는 것은 정확한 방법이 아님
        정말 빠른 알고리즘은 시간 차이를 측정하기 어려움
        따라서, 시간을 측정하는 것은 비교하기 어려움
        -> 컴퓨터가 처리해야 하는 연산의 갯수를 세자!, 어떤 컴퓨터든 그 갯수는 같기에 비교하기 쉬움

    Big O 표기법
        대략적으로 얼마나 많은 연산이 필요한지 나타내는 방법
        함수를 입력 크기와 실행 시간의 최악의 가정을 한 관계로 설명함
        O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)
        O(1): 상수 시간
            산수 연산, 변수 할당, 배열 인덱싱, 객체 속성 접근(키 검색)
            루프가 있다면 루프의 길이 * 루프 안의 연산

    JS의 공간 복잡도
        O(1) : boolean, number, null, undefined, symbol
        O(n) : string,  reference type(array, object, functionm, set, map, weakset, weakmap, date, regExp, promise)

        Objectives
            Key-value, no order, fast insertion/access/removal
            Insertion - O(1)
            Removal - O(1)
            Access - O(1)
            Searching - O(n) - O(n)이지만, O(1)로 만들 수 있음, value 값의 내용을 모르기에 모든 키 값을 순회해야 함
            Object.keys - O(n)
            Object.values - O(n)
            Object.entries - O(n)
            hasOwnProperty - O(1)
            Object.assign - O(n)
            spread operator - O(n)

        Arrays
            Ordered lists, fast access using index
            Insertion - It depends
                At the end - O(1)
                At the beginning - O(n)
                At the middle - O(n)
            Removal - It depends
                At the end - O(1)
                At the beginning - O(n)
                At the middle - O(n)
            Access - O(1)
            Searching - O(n)
            push - O(1)
            pop - O(1)
            shift - O(n)
            unshift - O(n)
            concat - O(n)
            slice - O(n)
            splice - O(n)
            sort - O(n log n)
            forEach/map/filter/reduce/etc. - O(n)
            filter - O(n)
            includes - O(n)
            indexOf - O(n)
            find - O(n)
            findIndex - O(n)
            reduce - O(n)
            some - O(n)
            every - O(n)
            flat - O(n)
            flatMap - O(n)
            keys - O(n)
            values - O(n)
            entries - O(n)
            hasOwnProperty - O(1)
            Array.from - O(n)
            spread operator - O(n)

        Sets
            Unique values, no order, fast insertion/access/removal
            Insertion - O(1)
            Removal - O(1)
            Access - O(1)
            Searching - O(1)
            forEach - O(n)
            has - O(1)
            add - O(1)
            delete - O(1)
            clear - O(1)
            size - O(1)

        Maps
            Key-value pairs, keys can be any type, ordered by insertion, fast insertion/access/removal
            Insertion - O(1)
            Removal - O(1)
            Access - O(1)
            Searching - O(1)
            forEach - O(n)
            has - O(1)
            get - O(1)
            set - O(1)
            delete - O(1)
            clear - O(1)
            size - O(1)

        WeakSets
            Same as Sets, but only accepts objects, no primitives
            Insertion - O(1)
            Removal - O(1)
            Access - O(1)
            Searching - O(1)
            forEach - O(n)
            has - O(1)
            add - O(1)
            delete - O(1)
            clear - O(1)
            size - O(1)

        WeakMaps
            Same as Maps, but only accepts objects as keys, no primitives
            Insertion - O(1)
            Removal - O(1)
            Access - O(1)
            Searching - O(1)
            forEach - O(n)
            has - O(1)
            get - O(1)
            set - O(1)
            delete - O(1)
            clear - O(1)
            size - O(1)

        Object vs Map vs WeakMap
            Object
                Keys are strings only
                Keys are ordered
                Size is not easily retrievable

            Map
                Keys can be any type
                Keys are ordered by insertion
                Size is easily retrievable

            WeakMap
                Keys must be objects
                Keys are not enumerable
                Size is not easily retrievable

        Array vs Set vs WeakSet
            Array
                Ordered list
                Can contain any data type
                Can contain duplicates
                Size is easily retrievable

            Set
                Unique values
                Can contain any data type
                No duplicates
                Size is easily retrievable

            WeakSet
                Unique values
                Can only contain objects
                No primitives
                No duplicates
                Size is not easily retrievable

