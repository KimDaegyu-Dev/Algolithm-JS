--평균 일일 대여 요금 구하기
    SELECT 
        ROUND(AVG(DAILY_FEE), 0) AS AVERAGE_FEE 
    FROM CAR_RENTAL_COMPANY_CAR 
    WHERE CAR_TYPE = 'SUV';
-- 재구매가 일어난 상품과 회원 리스트 구하기
    SELECT USER_ID, PRODUCT_ID
    FROM ONLINE_SALE 
    GROUP BY
        USER_ID,
        PRODUCT_ID
    HAVING
        COUNT(sales_amount) >= 2
    ORDER BY USER_ID ASC, PRODUCT_ID DESC;
--흉부외과 또는 일반외과 의사 목록 출력하기
    SELECT
        DR_NAME,
        DR_ID,
        MCDP_CD,
        DATE_FORMAT(HIRE_YMD, '%Y-%m-%d') AS HIRE_YMD
    FROM DOCTOR
    WHERE
        MCDP_CD IN ('CS', 'GS')
    ORDER BY HIRE_YMD DESC, DR_NAME;
-- 역순 정렬하기
    SELECT
        NAME,
        DATETIME
    FROM ANIMAL_INS
    ORDER BY ANIMAL_ID DESC;
-- 아픈 동물 찾기
    SELECT
        ANIMAL_ID,
        NAME
    FROM ANIMAL_INS
    WHERE INTAKE_CONDITION = 'Sick'
-- 어린 동물 찾기
    SELECT
        ANIMAL_ID,
        NAME
    FROM ANIMAL_INS
    WHERE INTAKE_CONDITION != 'AGED';
-- 동물의 아이디와 이름
    SELECT
        ANIMAL_ID,
        NAME
    FROM ANIMAL_INS;
-- 여러 기준으로 정렬하기
    SELECT
        ANIMAL_ID,
        NAME,
        DATETIME
    FROM ANIMAL_INS
    ORDER BY NAME, DATETIME DESC;
-- 상위 n개 레코드
    SELECT NAME
    FROM ANIMAL_INS
    WHERE DATETIME = (
        SELECT MIN(DATETIME) 
        FROM ANIMAL_INS
    )
-- 조건에 맞는 회원수 구하기
    SELECT
        COUNT(USER_ID)
    FROM USER_INFO
    WHERE YEAR(JOINED) = 2021 AND AGE BETWEEN 20 AND 29
-- 3월에 태어난 여성 회원 목록 출력하기
    SELECT 
        MEMBER_ID, 
        MEMBER_NAME, 
        GENDER, 
        DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d') AS DATE_OF_BIRTH
    FROM MEMBER_PROFILE
    WHERE 
        MONTH(DATE_OF_BIRTH) = 3
        AND TLNO IS NOT NULL
        AND GENDER = 'W'
    ORDER BY MEMBER_ID ASC;
-- 과일로 만든 아이스크림 고르기
    SELECT
        f.FLAVOR
    FROM ICECREAM_INFO i
    JOIN FIRST_HALF f
    ON i.FLAVOR = f.FLAVOR
    WHERE 
        TOTAL_ORDER >= 3000
        AND i.INGREDIENT_TYPE = 'fruit_based'
    ORDER BY TOTAL_ORDER DESC;
-- 강원도에 위치한 생산공장 목록 출력하기
    SELECT
        FACTORY_ID,
        FACTORY_NAME,
        ADDRESS
    FROM FOOD_FACTORY
    WHERE ADDRESS LIKE '강원도%'
    ORDER BY FACTORY_ID;
-- 인기있는 아이스크림
    SELECT
        FLAVOR
    FROM FIRST_HALF
    ORDER BY TOTAL_ORDER DESC, SHIPMENT_ID;
-- 12세 이하인 여자 환자 목록 출력하기
    SELECT
        PT_NAME,
        PT_NO,
        GEND_CD,
        AGE,
        COALESCE(TLNO, 'NONE') AS TLNO
    FROM PATIENT
    WHERE AGE <= 12
        AND GEND_CD = 'W'
    ORDER BY AGE DESC, PT_NAME;
-- 조건에 맞는 도서 리스트 출력하기
    SELECT
        BOOK_ID,
        DATE_FORMAT(PUBLISHED_DATE, '%Y-%m-%d') AS PUBLISHED_DATE
    FROM BOOK
    WHERE 
        YEAR(PUBLISHED_DATE) = 2021
        AND CATEGORY = '인문'
    ORDER BY PUBLISHED_DATE;
-- 조건에 부합하는 중고거래 댓글 조회하기
    SELECT
        TITLE,
        b.BOARD_ID,
        REPLY_ID,
        r.WRITER_ID,
        r.CONTENTS,
        DATE_FORMAT(r.CREATED_DATE, '%Y-%m-%d') AS CREATED_DATE
    FROM USED_GOODS_BOARD b
    JOIN USED_GOODS_REPLY r
    ON b.BOARD_ID = r.BOARD_ID
    WHERE
        DATE_FORMAT(b.CREATED_DATE,'%Y-%m') = '2022-10'
    ORDER BY 
        r.CREATED_DATE,
        b.TITLE
-- 모든 레코드 조회하기
    SELECT
        ANIMAL_ID,
        ANIMAL_TYPE,
        DATETIME,
        INTAKE_CONDITION,
        NAME,
        SEX_UPON_INTAKE
    FROM ANIMAL_INS;
-- 업그레이드 된 아이템 구하기
    SELECT
        t.ITEM_ID,
        f.ITEM_NAME,
        f.RARITY
    FROM ITEM_INFO i
    INNER JOIN ITEM_TREE t
    ON i.ITEM_ID = t.PARENT_ITEM_ID
    INNER JOIN ITEM_INFO f
    ON t.ITEM_ID = f.ITEM_ID
    WHERE 
        i.RARITY = 'RARE'
    ORDER BY
        t.ITEM_ID DESC;
-- Python 개발자 찾기
    SELECT
        ID,
        EMAIL,
        FIRST_NAME,
        LAST_NAME
    FROM DEVELOPER_INFOS
    WHERE 'Python' IN (SKILL_3, SKILL_2, SKILL_1)
    ORDER BY 1 ASC;
-- 조건에 맞는 개발자 찾기
    WITH 
    cte_python 
        AS (
            SELECT
                CODE
            FROM SKILLCODES
            WHERE NAME='Python'
        ),
    cte_c
        AS (
            SELECT
                CODE
            FROM SKILLCODES
            WHERE NAME='C#'
        )
    SELECT 
        ID,
        EMAIL,
        FIRST_NAME,
        LAST_NAME
    FROM DEVELOPERS
    WHERE 
        SKILL_CODE&(SELECT * FROM cte_python) 
        OR SKILL_CODE&(SELECT * FROM cte_c)
    ORDER BY ID;
    -- 다른 사람 풀이
        -- JOIN 활용
        SELECT
            DISTINCT id,
            email,
            first_name,
            last_name
        FROM
            developers d
            JOIN skillcodes s
            ON s.name IN ('C#', 'Python')
            AND d.skill_code & s.code = s.code
        ORDER BY
            1

        -- 서브쿼리 활용
        SELECT
            DISTINCT id,
            email,
            first_name,
            last_name
        FROM
            developers
        WHERE
            skill_code & (SELECT SUM(code) FROM skillcodes WHERE name IN ('C#', 'Python')) 
        ORDER BY
            1
-- 잔챙이 잡은 수 구하기
    SELECT
        COUNT(ID) AS FISH_COUNT
    FROM FISH_INFO
    WHERE LENGTH IS NULL;
-- 가장 큰 물고기 10마리 구하기
    SELECT 
        ID,
        LENGTH
    FROM FISH_INFO
    ORDER BY LENGTH DESC, ID
    LIMIT 10;
-- 특정 물고기를 잡은 총 수 구하기
    SELECT
        COUNT(ID) AS FISH_COUNT
    FROM FISH_INFO i
    JOIN FISH_NAME_INFO n
    ON i.FISH_TYPE = n.FISH_TYPE
    WHERE n.FISH_NAME IN ('BASS', 'SNAPPER');
-- 특정 형질을 가지는 대장균 찾기
    SELECT 
        COUNT(*) AS COUNT
    FROM ECOLI_DATA
    WHERE 
        GENOTYPE&2!=2 AND 
        (GENOTYPE&1=1 OR GENOTYPE&4=4);
-- 부모의 형질을 모두 가지는 대장균 찾기
    SELECT
        c.ID,
        c.GENOTYPE,
        p.GENOTYPE AS PARENT_GENOTYPE
    FROM ECOLI_DATA c
    JOIN ECOLI_DATA p
    ON p.ID = c.PARENT_ID
    WHERE c.GENOTYPE&p.GENOTYPE = p.GENOTYPE
    ORDER BY c.ID;
-- 대장균의 크기에 따라 분류하기 1
    SELECT
        ID,
        CASE
            WHEN SIZE_OF_COLONY <= 100 THEN 'LOW'
            WHEN SIZE_OF_COLONY BETWEEN 100 AND 1000 THEN 'MEDIUM'
            WHEN SIZE_OF_COLONY >= 1000 THEN 'HIGH'
        END AS SIZE
    FROM ECOLI_DATA
    ORDER BY ID;
-- 대장균의 크기에 따라 분류하기 2
    WITH cte_size_rank
    AS(
        SELECT
            ID,
            NTILE(4) OVER(ORDER BY SIZE_OF_COLONY DESC) AS SIZE_RANK
        FROM ECOLI_DATA
    )

    SELECT
        e.ID,
        CASE
            WHEN SIZE_RANK = 1 THEN 'CRITICAL'
            WHEN SIZE_RANK = 2 THEN 'HIGH'
            WHEN SIZE_RANK = 3 THEN 'MEDIUM'
            WHEN SIZE_RANK = 4 THEN 'LOW'
        END AS COLONY_NAME
    FROM ECOLI_DATA e
    JOIN cte_size_rank s
    ON e.ID = s.ID
    ORDER BY e.ID;
-- 특정 세대의 대장균 찾기
    SELECT 
        third.ID
    FROM ECOLI_DATA third
    INNER JOIN ECOLI_DATA second
    ON third.PARENT_ID = second.ID
    INNER JOIN ECOLI_DATA first
    ON second.PARENT_ID = first.ID
        AND first.PARENT_ID IS NULL;
    -- 다른 사람 풀이
    WITH RECURSIVE TBL AS (
    SELECT
    ID,
    PARENTID,
    1 AS GENERATION
    FROM
    ECOLIDATA
    WHERE
    PARENT_ID IS NULL

    UNION ALL

    SELECT
        e.ID,
        e.PARENT_ID,
        GENERATION + 1
    FROM
        ECOLI_DATA e INNER JOIN TBL t
        ON e.PARENT_ID = t.ID
    )

    SELECT ID
    FROM TBL
    WHERE GENERATION = 3
    ORDER BY ID ASC;
-- 대장균들의 자식의 수 구하기
    WITH cte_child_count
    AS (
        SELECT 
            DISTINCT PARENT_ID,
            COUNT(ID) OVER(PARTITION BY PARENT_ID) AS CHILD_COUNT
        FROM ECOLI_DATA
        WHERE PARENT_ID IS NOT NULL
    )
    SELECT
        e.ID,
        COALESCE(CHILD_COUNT, 0) AS CHILD_COUNT
    FROM ECOLI_DATA e
    LEFT JOIN cte_child_count c
    ON e.ID = c.PARENT_ID;
-- 서울에 위치한 식당 목록 출력하기
    SELECT
        i.REST_ID,
        REST_NAME,
        FOOD_TYPE,
        FAVORITES,
        ADDRESS,
        ROUND(AVG(REVIEW_SCORE),2) AS SCORE
    FROM REST_INFO i
    JOIN REST_REVIEW r
    ON i.REST_ID = r.REST_ID
    WHERE ADDRESS LIKE '서울%'
    GROUP BY i.REST_ID
    ORDER BY SCORE DESC, FAVORITES DESC;
-- 오프라인/온라인 판매 데이터 통합하기
    SELECT 
        DATE_FORMAT(SALES_DATE,'%Y-%m-%d') AS SALES_DATE,
        PRODUCT_ID,
        USER_ID,
        SALES_AMOUNT
    FROM 
        (SELECT
            *
        FROM ONLINE_SALE
        UNION ALL
        SELECT
            OFFLINE_SALE_ID,
            NULL AS USER_ID,
            PRODUCT_ID,
            SALES_AMOUNT,
            SALES_DATE
        FROM OFFLINE_SALE) AS a
    WHERE DATE_FORMAT(SALES_DATE, '%Y-%m') = '2022-03'
    ORDER BY SALES_DATE, PRODUCT_ID, USER_ID;
-- 멸종위기의 대장균 찾기
    WITH RECURSIVE cte_generation
    AS (
        SELECT  ID,
                PARENT_ID,
                1 AS GENERATION
        FROM ECOLI_DATA
        WHERE PARENT_ID IS NULL
        UNION ALL
        SELECT  e.ID,
                e.PARENT_ID,
                GENERATION + 1
        FROM ECOLI_DATA e
        JOIN cte_generation g
        ON e.PARENT_ID = g.ID
    ),
    cte_non_child 
    AS (
        SELECT p.ID
        FROM ECOlI_DATA p
        LEFT JOIN ECOLI_DATA c
        ON p.ID = c.PARENT_ID
        WHERE c.ID IS NULL
    )
    SELECT
        COUNT(*) AS COUNT,
        GENERATION
    FROM 
        (SELECT 
            nc.ID,
            GENERATION
        FROM cte_non_child nc
        JOIN cte_generation g
        ON nc.ID = g.ID) a
    GROUP BY GENERATION
    ORDER BY GENERATION
    -- 다른 사람 풀이
    WITH RECURSIVE rc AS (
        SELECT id, parent_id, 1 AS gen
        FROM ecoli_data
        WHERE parent_id IS NULL
        
        UNION ALL
        
        SELECT e.id, e.parent_id, rc.gen + 1 AS gen
        FROM ecoli_data AS e
        JOIN rc ON rc.id = e.parent_id
    ) 
    SELECT COUNT(rc1.id) AS count, rc1.gen AS generation
    FROM rc rc1
    LEFT JOIN rc rc2 ON rc2.parent_id = rc1.id
    WHERE rc2.parent_id IS NULL
    GROUP BY rc1.gen
    ORDER BY rc1.gen;