-- 상품 별 오프라인 매출 구하기
    SELECT  PRODUCT_CODE,
            SUM(sales_amount) * price AS SALES
    FROM OFFLINE_SALE s
    JOIN PRODUCT p
    USING (PRODUCT_ID)
    GROUP BY PRODUCT_CODE
    ORDER BY SALES DESC, PRODUCT_CODE;
-- 조건에 맞는 도서와 저자 리스트 출력하기
    SELECT  BOOK_ID,
            AUTHOR_NAME,
            DATE_FORMAT(PUBLISHED_DATE, '%Y-%m-%d') AS PUBLISHED_DATE
    FROM    BOOK
    JOIN    AUTHOR
    USING   (AUTHOR_ID)
    WHERE   CATEGORY = '경제'
    ORDER BY PUBLISHED_DATE
-- 없어진 기록 찾기
    SELECT  ANIMAL_ID, 
            o.NAME
    FROM ANIMAL_OUTS o
    LEFT JOIN ANIMAL_INS i
    USING (ANIMAL_ID)
    WHERE i.DATETIME IS NULL
    ORDER BY ANIMAL_ID
-- 있었는데요 없었습니다
    SELECT
        i.ANIMAL_ID,
        i.NAME
    FROM ANIMAL_INS i
    JOIN ANIMAL_OUTS o
    USING (ANIMAL_ID)
    WHERE TIMEDIFF(o.DATETIME,  i.DATETIME) < 0
    ORDER BY i.DATETIME
-- 오랜 기간 보호한 동물(1)
    SELECT  i.NAME,
            i.DATETIME
    FROM ANIMAL_INS i
    LEFT JOIN ANIMAL_OUTS o
    USING (ANIMAL_ID)
    WHERE o.DATETIME IS NULL
    ORDER BY i.DATETIME
    LIMIT 3;
-- 보호소에서 중성화한 동물
    SELECT  i.ANIMAL_ID,
            i.ANIMAL_TYPE,
            i.NAME
    FROM ANIMAL_INS i
    JOIN ANIMAL_OUTS o
    USING (ANIMAL_ID)
    WHERE i.SEX_UPON_INTAKE LIKE 'Intact%'
        AND (o.SEX_UPON_OUTCOME LIKE 'Spayed%' OR o.SEX_UPON_OUTCOME LIKE 'Neutered%')
    ORDER BY ANIMAL_ID
    -- 다른 풀이
    SELECT  i.ANIMAL_ID,
            i.ANIMAL_TYPE,
            i.NAME
    FROM ANIMAL_INS i
    JOIN ANIMAL_OUTS o
    USING (ANIMAL_ID)
    WHERE i.SEX_UPON_INTAKE LIKE 'Intact%'
        AND o.SEX_UPON_OUTCOME REGEXP('Spayed|Neutered')
    ORDER BY ANIMAL_ID
-- 주문량이 많은 아이스크림들 조회하기
    SELECT FLAVOR
    FROM (
        SELECT FLAVOR, SUM(TOTAL_ORDER) AS TOTAL_ORDER
        FROM JULY
        GROUP BY FLAVOR
        UNION ALL 
        SELECT FLAVOR, SUM(TOTAL_ORDER) AS TOTAL_ORDER
        FROM FIRST_HALF
        GROUP BY FLAVOR
    ) A
    GROUP BY FLAVOR
    ORDER BY  SUM(TOTAL_ORDER) DESC
    LIMIT 3;
    -- 다른 풀이
    SELECT
        f.FLAVOR
    FROM
        FIRST_HALF f INNER JOIN JULY j
        ON f.FLAVOR = j.FLAVOR
    GROUP BY
        f.FLAVOR
    ORDER BY
        SUM(f.TOTAL_ORDER + j.TOTAL_ORDER) DESC
    LIMIT 3;
-- 특정 기간동안 대여 가능한 자동차들의 대여비용 구하기
    SELECT  C.CAR_ID, 
            C.CAR_TYPE, 
            ROUND(C.DAILY_FEE*30*(1-P.DISCOUNT_RATE/100)) AS FEE
    FROM    CAR_RENTAL_COMPANY_CAR C
    LEFT JOIN CAR_RENTAL_COMPANY_RENTAL_HISTORY H 
    ON      C.CAR_ID = H.CAR_ID
    LEFT JOIN CAR_RENTAL_COMPANY_DISCOUNT_PLAN P 
    ON      C.CAR_TYPE = P.CAR_TYPE 
            AND P.DURATION_TYPE = '30일 이상'
    WHERE   C.CAR_TYPE IN ('SUV', '세단')
    GROUP BY C.CAR_ID, C.CAR_TYPE
    HAVING  MIN(H.START_DATE) > '2022-11-30' 
            OR MAX(H.END_DATE) < '2022-11-01' 
            AND FEE BETWEEN 500000 AND 2000000-1
-- 5월 식품들의 총매출 조회하기
    SELECT  o.product_id, 
            product_name,
            SUM(AMOUNT) * p.price AS TOTAL_SALE
    FROM FOOD_ORDER o
    JOIN FOOD_PRODUCT p
    ON o.product_id = p.product_id
    WHERE PRODUCE_DATE LIKE '2022-05%'
    GROUP BY o.product_id
    ORDER BY TOTAL_SALE DESC, o.product_id;
-- 그룹별 조건에 맞는 식당 목록 출력하기
    WITH cte_member_review_count
    AS (SELECT  *,
                COUNT(*) AS REVIEW_COUNT
    FROM    REST_REVIEW
    GROUP BY MEMBER_ID
    ), cte_max_review
    AS (
    SELECT *, MAX(REVIEW_COUNT) OVER()AS MOST_COUNT
    FROM cte_member_review_count
    )

    SELECT  p.MEMBER_NAME,
            r.REVIEW_TEXT,
            DATE_FORMAT(r.REVIEW_DATE, '%Y-%m-%d') AS REVIEW_DATE
    FROM   REST_REVIEW r
    JOIN   MEMBER_PROFILE p
    ON r.MEMBER_ID = p.MEMBER_ID
    JOIN   cte_max_review m
    ON r.MEMBER_ID = m.MEMBER_ID
    WHERE REVIEW_COUNT = MOST_COUNT
    ORDER BY 3, 2;
    -- 다른 풀이
    SELECT B.MEMBER_NAME, A.REVIEW_TEXT, DATE_FORMAT(A.REVIEW_DATE, "%Y-%m-%d") AS REVIEW_DATE
    FROM REST_REVIEW A
    JOIN (
        SELECT DENSE_RANK() OVER (ORDER BY COUNT(M.MEMBER_ID) DESC) AS RANKING, M.MEMBER_ID, M.MEMBER_NAME
        FROM MEMBER_PROFILE M
        JOIN REST_REVIEW R
        ON M.MEMBER_ID = R.MEMBER_ID
        GROUP BY M.MEMBER_ID
        ORDER BY RANKING, REVIEW_DATE, R.REVIEW_TEXT
    ) B
    ON A.MEMBER_ID = B.MEMBER_ID
    WHERE B.RANKING = 1
    ORDER BY REVIEW_DATE, A.REVIEW_TEXT
-- FrontEnd 개발자 찾기
    WITH frontend_dev_code
    AS (
        SELECT SUM(CODE) AS CODE
        FROM SKILLCODES
        WHERE CATEGORY = 'Front End'
        GROUP BY CATEGORY
    )
    SELECT 
            ID, 
            EMAIL, 
            FIRST_NAME, 
            LAST_NAME
    FROM DEVELOPERS d
    JOIN frontend_dev_code c
    ON d.SKILL_CODE&c.CODE != 0
    ORDER BY ID
-- 상품을 구매한 회원 비율 구하기
    -- 2021년에 가입한 전체 회원들 중
    -- 년, 월 별로 상품을 구매한 회원수와 상품을 구매한 회원의 비율(=2021년에 가입한 회원 중 상품을 구매한 회원수 / 2021년에 가입한 전체 회원 수)
    WITH 
    cte_joined_and_buy AS (
        -- 2021에 가입하고 상품을 구매한 회원
        SELECT  *, COUNT(*) AS BUY_COUNT
        FROM USER_INFO i
        JOIN ONLINE_SALE o
        USING (USER_ID)
        WHERE YEAR(JOINED) = 2021
        GROUP BY i.USER_ID, YEAR(SALES_DATE), MONTH(SALES_DATE)
    ), 
    cte_joined_2021 AS (
        SELECT  COUNT(*) AS COUNT
        FROM USER_INFO 
        WHERE YEAR(JOINED) = 2021
    )
    SELECT  YEAR(SALES_DATE) AS YEAR, 
            MONTH(SALES_DATE) AS MONTH, 
            COUNT(USER_ID) AS PURCHASED_USERS, 
            ROUND(COUNT(USER_ID)/(SELECT COUNT FROM cte_joined_2021), 1) AS PURCHASED_RATIO
    FROM cte_joined_and_buy
    GROUP BY YEAR(SALES_DATE), MONTH(SALES_DATE)
    ORDER BY 1, 2;