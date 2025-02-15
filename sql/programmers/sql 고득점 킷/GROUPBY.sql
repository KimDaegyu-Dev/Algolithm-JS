-- 월별 잡은 물고기 수 구하기
    SELECT 
        COUNT(ID) AS FISH_COUNT,
        MONTH(CAST(TIME AS DATE)) AS MONTH
    FROM FISH_INFO
    GROUP BY MONTH(CAST(TIME AS DATE))
    ORDER BY MONTH(CAST(TIME AS DATE)) ASC;
    -- 다른 사람 풀이
    SELECT 
        COUNT(ID) AS FISH_COUNT,
        MONTH(TIME) AS MONTH
    FROM FISH_INFO
    GROUP BY 2
    ORDER BY 2 ASC;

-- 자동차 종류 별 특정 옵션이 포함된 자동차 수 구하기
    SELECT
        CAR_TYPE,
        COUNT(CAR_TYPE) AS CARS
    FROM CAR_RENTAL_COMPANY_CAR
    WHERE 
        OPTIONS LIKE '%통풍시트%' 
        OR OPTIONS LIKE '%열선시트%' 
        OR OPTIONS LIKE '%가죽시트%'
    GROUP BY CAR_TYPE
    ORDER BY CAR_TYPE;

-- 특정 조건을 만족하는 물고기별 수와 최대 길이 구하기
    SELECT
        COUNT(ID) FISH_COUNT,
        MAX(LENGTH) MAX_LENGTH,
        FISH_TYPE
    FROM FISH_INFO
    GROUP BY FISH_TYPE -- 물고기 종류별로 그룹
    HAVING AVG(
        IF(LENGTH<=10 OR LENGTH IS NULL, 10, LENGTH) -- 길이가 10 이하인 물고기는 10으로 처리
        ) >= 33 -- 종류별 길이 평균이 33 이상인 행만 출력
    ORDER BY FISH_TYPE ASC;
    -- 다른 사람 풀이
    SELECT 
        COUNT(*) AS FISH_COUNT, 
        MAX(A.LENGTH) AS MAX_LENGTH, 
        A.FISH_TYPE
    FROM 
        (SELECT FISH_TYPE, 
                CASE 
                    WHEN LENGTH <= 10 OR LENGTH IS NULL THEN 10 
                    ELSE LENGTH 
                END AS LENGTH  -- 길이가 10 이하인 물고기는 10으로 처리
        FROM FISH_INFO) 
        AS A
    GROUP BY A.FISH_TYPE
    HAVING AVG(A.LENGTH) >= 33
    ORDER BY A.FISH_TYPE

-- 고양이와 개는 몇 마리 있을까
    SELECT
        ANIMAL_TYPE,
        COUNT(ANIMAL_ID) as count
    FROM ANIMAL_INS
    GROUP BY 1
    ORDER BY 1;

-- 동명 동물 수 찾기
    SELECT
        NAME,
        COUNT(1) AS count
    FROM ANIMAL_INS
    WHERE 
        NAME IS NOT NULL
    GROUP BY 1
    HAVING COUNT(1) > 1
    ORDER BY NAME;

-- 년, 월, 성별 별 상품 구매 회원 수 구하기
    SELECT
        YEAR(SALES_DATE) AS YEAR,
        MONTH(SALES_DATE) AS MONTH,
        GENDER,
        COUNT(DISTINCT UI.USER_ID) AS USERS
    FROM ONLINE_SALE OS
    INNER JOIN USER_INFO UI
        ON OS.USER_ID = UI.USER_ID
    WHERE GENDER IS NOT NULL
    GROUP BY
        YEAR, MONTH, GENDER
    ORDER BY YEAR, MONTH, GENDER;

-- 입양 시각 구하기(2)
    WITH RECURSIVE HOURS
    AS (
        SELECT 0 AS HOUR
        UNION ALL
        SELECT HOUR+1
        FROM HOURS
        WHERE HOUR<23
    )
    SELECT 
        h.HOUR,
        IFNULL(c.COUNT, 0)
    FROM HOURS as h
        LEFT JOIN (
            SELECT
                HOUR(DATETIME) AS HOUR,
                COUNT(ANIMAL_ID) AS COUNT
            FROM ANIMAL_OUTS
            GROUP BY HOUR(DATETIME)
            ) AS c
        ON h.HOUR = c.HOUR;
    -- 다른 사람 풀이
    SELECT
        H.HOUR,
        COUNT(HOUR(A.DATETIME))
    FROM HOURS AS H
    LEFT JOIN ANIMAL_OUTS AS A
    ON H.HOUR = HOUR(A.DATETIME)
    GROUP BY H.HOUR;

-- 입양 시각 구하기(1)
    SELECT
        HOUR(DATETIME) AS HOUR,
        COUNT(ANIMAL_ID) AS COUNT
    FROM ANIMAL_OUTS
    WHERE HOUR(DATETIME) BETWEEN 9 AND 19
    GROUP BY HOUR 
    ORDER BY HOUR

-- 가격대 별 상품 개수 구하기
    SELECT
        TRUNCATE(PRICE, -4) AS PRICE_GROUP,
        COUNT(PRODUCT_ID)
    FROM PRODUCT
    GROUP BY 1
    ORDER BY 1;

-- 성분으로 구분한 아이스크림 총 주문량
    SELECT
        i.INGREDIENT_TYPE,
        SUM(TOTAL_ORDER) AS TOTAL_ORDER
    FROM FIRST_HALF AS f
    LEFT JOIN ICECREAM_INFO AS i
    ON f.FLAVOR = i.FLAVOR
    GROUP BY 1

-- 조건에 맞는 사원 정보 조회하기
    WITH SCORE_SUM 
    AS (
        SELECT 
            EMP_NO,
            SUM(SCORE) AS SCORE
        FROM HR_GRADE
        GROUP BY EMP_NO
        )

    SELECT 
        s.SCORE,
        e.EMP_NO,
        EMP_NAME,
        POSITION,
        EMAIL
    FROM HR_EMPLOYEES AS e
    LEFT JOIN SCORE_SUM AS s
    ON e.EMP_NO=s.EMP_NO
    ORDER BY s.SCORE DESC
    LIMIT 1;
    -- 다른 사람 풀이
    WITH 
    cte_total_score AS(
        SELECT
            emp_no,
            SUM(score) score
        FROM
            hr_grade
        GROUP BY 
            1
    ),
    cte_score_rnk AS(
        SELECT
            c.emp_no, e.emp_name, e.position, e.email, c.score,
            DENSE_RANK() OVER(ORDER BY score DESC) rnk
        FROM
            cte_total_score c
            JOIN hr_employees e
            ON c.emp_no = e.emp_no
    )

    SELECT
        score,
        emp_no,
        emp_name,
        position,
        email
    FROM
        cte_score_rnk
    WHERE
        rnk=1;

-- 연간 평가점수에 해당하는 평가 등급 및 성과금 조회하기
    WITH cte_grade 
    AS (
        SELECT
            EMP_NO,
            CASE
                WHEN AVG(SCORE) >= 96 THEN 'S'
                WHEN AVG(SCORE) >= 90 THEN 'A'
                WHEN AVG(SCORE) >= 80 THEN 'B'
                ELSE 'C'
            END AS GRADE,
            CASE
                WHEN AVG(SCORE) >= 96 THEN 0.2
                WHEN AVG(SCORE) >= 90 THEN 0.15
                WHEN AVG(SCORE) >= 80 THEN 0.1
                ELSE 0
            END AS BONUS
        FROM HR_GRADE
        GROUP BY EMP_NO
    )
    SELECT 
        e.EMP_NO,
        e.EMP_NAME, 
        g.GRADE, 
        e.SAL * g.BONUS AS BONUS
    FROM HR_EMPLOYEES as e
    JOIN cte_grade as g
    ON e.EMP_NO=g.EMP_NO
    ORDER BY e.EMP_NO;

-- 부서별 평균 연봉 조회하기
    WITH cte_avg_sal
    AS(
        SELECT
            DEPT_ID,
            ROUND(AVG(SAL)) AS AVG_SAL
        FROM HR_EMPLOYEES
        GROUP BY DEPT_ID
    )
    SELECT
        d.DEPT_ID,
        d.DEPT_NAME_EN,
        a.AVG_SAL
    FROM HR_DEPARTMENT AS d
    JOIN cte_avg_sal AS a
    ON d.DEPT_ID=a.dept_id
    ORDER BY a.AVG_SAL DESC;
-- 노선별 평균 역 사이 거리 조회하기
    SELECT 
        ROUTE,
        CONCAT(ROUND(SUM(d_between_dist),1),'km') AS TOTAL_DISTANCE,
        CONCAT(ROUND(AVG(d_between_dist),2), 'km') AS AVERAGE_DISTANCE
    FROM SUBWAY_DISTANCE
    GROUP BY route
    ORDER BY ROUND(SUM(d_between_dist),1) DESC;
-- 물고기 종류 별 잡은 수 구하기
    SELECT 
        COUNT(id) AS FISH_COUNT,
        n.fish_name AS FISH_NAME
    FROM FISH_INFO as i
    JOIN FISH_NAME_INFO AS n
    ON i.fish_type = n.fish_type
    GROUP BY n.fish_name
    ORDER BY 1 DESC;
-- 진료과별 총 예약 횟수 출력하기
    SELECT
        MCDP_CD AS '진로과코드',
        COUNT(PT_NO) AS '5월예약건수'
    FROM APPOINTMENT
    WHERE MONTH(APNT_YMD)=5
    GROUP BY MCDP_CD
    ORDER BY 2, 1;
-- 언어별 개발자 분류하기

    WITH SKILL_P AS (
        SELECT CODE
        FROM SKILLCODES
        WHERE NAME = 'Python'
    ),
    SKILL_F AS (
        SELECT SUM(CODE) AS CODE
        FROM SKILLCODES
        WHERE CATEGORY = 'Front End'
    ),
    SKILL_C AS (
        SELECT CODE
        FROM SKILLCODES
        WHERE NAME = 'C#'
    )
    SELECT CASE
            WHEN SKILL_P.CODE & SKILL_CODE AND SKILL_F.CODE & SKILL_CODE THEN 'A'
            WHEN SKILL_C.CODE & SKILL_CODE THEN 'B'
            WHEN SKILL_F.CODE & SKILL_CODE THEN 'C' 
            END GRADE,
            ID, EMAIL
    FROM DEVELOPERS, SKILL_P, SKILL_F, SKILL_C
    HAVING GRADE IS NOT NULL 
    ORDER BY GRADE, ID
-- 대여 횟수가 많은 자동차들의 월별 대여 횟수 구하기
    SELECT  MONTH(START_DATE) AS MONTH, 
            CAR_ID, 
            COUNT(*) AS RECORDS
    FROM (SELECT *
        FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
        WHERE   START_DATE BETWEEN '2022-08-01' AND '2022-10-31') a
    WHERE CAR_ID IN (SELECT CAR_ID
        FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
        WHERE   START_DATE BETWEEN '2022-08-01' AND '2022-10-31'
        GROUP BY CAR_ID
        HAVING COUNT(CAR_ID) >= 5
        )
    GROUP BY MONTH(START_DATE), CAR_ID
    ORDER BY MONTH(START_DATE), CAR_ID DESC;
    -- 다른 사람 풀이
    WITH DATE_TABLE AS (
        SELECT 
            MONTH(START_DATE) AS MONTH, 
            CAR_ID, 
            START_DATE
        FROM 
            CAR_RENTAL_COMPANY_RENTAL_HISTORY
        WHERE 
            START_DATE BETWEEN '2022-08-01' AND '2022-10-31'
    ), ID_RENT_FIVE AS (
        SELECT 
            CAR_ID
        FROM 
            DATE_TABLE
        GROUP BY 
            CAR_ID
        HAVING 
            COUNT(*) >= 5
    )
    SELECT 
        MONTH, 
        CAR_ID, 
        COUNT(*) AS RECORDS
    FROM 
        DATE_TABLE
    WHERE 
        CAR_ID IN (
            SELECT CAR_ID FROM ID_RENT_FIVE
        )
    GROUP BY 
        MONTH, CAR_ID
    ORDER BY 
        MONTH ASC, CAR_ID DESC;
-- 자동차 대여 기록에서 대여중 / 대여 가능 여부 구분하기
    SELECT CAR_ID
        , CASE
            WHEN MAX('2022-10-16' BETWEEN START_DATE AND END_DATE) = 1 THEN '대여중'
            ELSE '대여 가능'
            END AS AVAILABILITY
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    GROUP BY CAR_ID
    ORDER BY CAR_ID DESC
-- 조건에 맞는 사용자와 총 거래금액 조회하기
    SELECT USER_ID, NICKNAME, SUM(PRICE) AS TOTAL_SALES
    FROM USED_GOODS_BOARD b
    JOIN USED_GOODS_USER u
    ON b.WRITER_ID = u.USER_ID
    WHERE STATUS = 'DONE'
    GROUP BY WRITER_ID
    HAVING SUM(PRICE)>=700000
    ORDER BY SUM(PRICE) ASC;
-- 즐겨찾기가 가장 많은 식당 정보 출력하기
    SELECT A.FOOD_TYPE
        , A.REST_ID
        , A.REST_NAME
        , A.FAVORITES
    FROM REST_INFO A
    JOIN (
            SELECT FOOD_TYPE
                , REST_ID
                , REST_NAME
                , FAVORITES
                , MAX(FAVORITES) AS RANKS
            FROM REST_INFO
                GROUP BY FOOD_TYPE
        ) B
    ON A.FAVORITES = B.RANKS
    WHERE A.FOOD_TYPE = B.FOOD_TYPE
    ORDER BY FOOD_TYPE DESC
    -- 다른 사람 풀이
    SELECT FOOD_TYPE
        , REST_ID
        , REST_NAME
        , FAVORITES
    FROM (
            SELECT FOOD_TYPE
                , REST_ID
                , REST_NAME
                , FAVORITES
                , RANK() OVER(PARTITION BY FOOD_TYPE ORDER BY FAVORITES DESC) AS RANKS
            FROM REST_INFO
        ) A
    WHERE 1 = 1
    AND RANKS = 1
    ORDER BY FOOD_TYPE DESC
-- 카테고리 별 도서 판매량 집계하기
    # 2022년 1월의 카테고리 별 도서 판매량
    SELECT CATEGORY, SUM(SALES) AS TOTAL_SALES
    FROM (
        SELECT *
        FROM BOOK_SALES s
        JOIN BOOK b
        USING(BOOK_ID)
        WHERE DATE_FORMAT(SALES_DATE, '%Y-%m') = '2022-01') A
    GROUP BY CATEGORY
    ORDER BY CATEGORY;
-- 저자 별 카테고리 별 매출액 집계하기
    SELECT  a.AUTHOR_ID,
            AUTHOR_NAME,
            CATEGORY, 
            SUM(SALES) AS TOTAL_SALES
    FROM (
        SELECT  a.AUTHOR_ID,
                AUTHOR_NAME,
                CATEGORY,
                PRICE * SALES AS SALES
        FROM BOOK_SALES s
        JOIN BOOK b
        USING (BOOK_ID)
        JOIN AUTHOR a
        USING (AUTHOR_ID)
        WHERE DATE_FORMAT(SALES_DATE, '%Y-%m') = '2022-01'
        ORDER BY a.AUTHOR_ID, CATEGORY DESC
        ) a
    GROUP BY AUTHOR_ID, CATEGORY
    ORDER BY a.AUTHOR_ID, CATEGORY DESC
-- 식품분류별 가장 비싼 식품의 정보 조회하기
    SELECT  A.CATEGORY,
            MAX_PRICE,
            A.PRODUCT_NAME
    FROM FOOD_PRODUCT A
    JOIN (SELECT *, MAX(PRICE) AS MAX_PRICE
    FROM FOOD_PRODUCT
    WHERE CATEGORY IN ('과자', '국', '김치', '식용유')
    GROUP BY CATEGORY
    ORDER BY MAX_PRICE DESC) B
    ON A.PRICE = B.MAX_PRICE
    WHERE A.CATEGORY IN ('과자', '국', '김치', '식용유')
    ORDER BY MAX_PRICE DESC;