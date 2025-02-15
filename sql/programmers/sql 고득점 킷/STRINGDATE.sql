-- 자동차 평균 대여 기간 구하기
    SELECT
        CAR_ID,
        ROUND(AVG(DATEDIFF(END_DATE, START_DATE)+1), 1) 
            AS AVERAGE_DURATION
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    GROUP BY CAR_ID
    HAVING AVERAGE_DURATION >= 7
    ORDER BY AVERAGE_DURATION DESC, CAR_ID DESC;
-- 루시와 엘라 찾기
    SELECT
        ANIMAL_ID,
        NAME,
        SEX_UPON_INTAKE
    FROM ANIMAL_INS
    WHERE NAME IN('Lucy', 'Ella', 'Pickle', 'Rogan', 'Sabrina', 'Mitty')
    ORDER BY ANIMAL_ID;
-- 이름에 el이 들어가는 동물 찾기
    SELECT
        ANIMAL_ID,
        NAME
    FROM ANIMAL_INS
    WHERE 
        NAME LIKE '%EL%'
        AND ANIMAL_TYPE = 'Dog'
    ORDER BY NAME
-- 중성화 여부 파악하기
    SELECT
        ANIMAL_ID,
        NAME,
        CASE
            WHEN SEX_UPON_INTAKE LIKE 'Neutered%' THEN 'O'
            WHEN SEX_UPON_INTAKE LIKE 'Spayed%' THEN 'O'
            ELSE 'X'
        END AS '중성화'
    FROM ANIMAL_INS
-- 오랜 기간 보호한 동물(2)
    WITH cte_period
    AS (
        SELECT
            i.ANIMAL_ID,
            i.NAME,
            DATEDIFF(o.DATETIME, i.DATETIME) AS PERIOD
        FROM ANIMAL_INS i
        JOIN ANIMAL_OUTS o
        ON i.ANIMAL_ID = o.ANIMAL_ID
        ORDER BY PERIOD DESC
    )
    SELECT
        ANIMAL_ID,
        NAME
    FROM cte_period
    LIMIT 2;
    -- 다른 사람 풀이
    ELECT A.ANIMAL_ID, A.NAME
    FROM ANIMAL_INS A JOIN ANIMAL_OUTS B
    USING (ANIMAL_ID)
    ORDER BY DATEDIFF(B.DATETIME, A.DATETIME) DESC
    LIMIT 2
-- 카테고리 별 상품 개수 구하기
    SELECT
        LEFT(PRODUCT_CODE, 2) AS CATEGORY,
        COUNT(*) AS PRODUCTS
    FROM PRODUCT
    GROUP BY LEFT(PRODUCT_CODE, 2)
-- DATETIME에서 DATE로 형 변환
    SELECT
        ANIMAL_ID,
        NAME,
        DATE_FORMAT(DATETIME, '%Y-%m-%d')
    FROM ANIMAL_INS
-- 연도 별 평균 미세먼지 농도 조회하기
    SELECT  YEAR(YM) AS YEAR,
            ROUND(AVG(PM_VAL1), 2) AS 'PM10',
            ROUND(AVG(PM_VAL2), 2) AS 'PM2.5'
    FROM    AIR_POLLUTION
    WHERE   1=1
            AND LOCATION2 = '수원'
            AND LOCATION1 = '경기도'
    GROUP BY YEAR(YM)
    ORDER BY YEAR(YM)
-- 한 해에 잡은 물고기 수 구하기
    SELECT  COUNT(*) AS FISH_COUNT
    FROM    FISH_INFO
    WHERE   YEAR(TIME) = 2021
-- 분기별 분화된 대장균의 개체 수 구하기
    SELECT      CONCAT(QUARTER(DIFFERENTIATION_DATE),'Q') AS QUARTER,
                COUNT(*) AS ECOLI_COUNT
    FROM        ECOLI_DATA
    GROUP BY    QUARTER
    ORDER BY    QUARTER;
-- 자동차 대여 기록에서 장기/단기 대여 구분하기
    SELECT      HISTORY_ID,
                CAR_ID,
                DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,
                DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE,
                CASE
                    WHEN DATEDIFF(END_DATE, START_DATE)+1 >= 30 THEN '장기 대여'
                    ELSE '단기 대여'
                END AS RENT_TYPE
    FROM        CAR_RENTAL_COMPANY_RENTAL_HISTORY
    WHERE       DATE_FORMAT(START_DATE, '%Y-%m') = '2022-09'
    ORDER BY    HISTORY_ID DESC;
-- 특정 옵션이 포함된 자동차 리스트 구하기
    SELECT      CAR_ID,
                CAR_TYPE,
                DAILY_FEE,
                OPTIONS
    FROM        CAR_RENTAL_COMPANY_CAR
    WHERE       OPTIONS LIKE '%네비게이션%'
    ORDER BY    CAR_ID DESC;
-- 조건에 부합하는 중고거래 상태 조회하기
    SELECT  BOARD_ID,
            WRITER_ID,
            TITLE,
            PRICE,
            CASE
                WHEN STATUS = 'SALE' THEN '판매중'
                WHEN STATUS = 'RESERVED' THEN '예약중'
                WHEN STATUS = 'DONE' THEN '거래완료'
            END AS STATUS
    FROM    USED_GOODS_BOARD
    WHERE   CREATED_DATE = '2022-10-05'
    ORDER BY BOARD_ID DESC
-- 조회수가 가장 많은 중고거래 게시판의 첨부파일 조회하기
    SELECT CONCAT('/home/grep/src/',BOARD_ID,'/',FILE_ID,FILE_NAME,FILE_EXT) AS FILE_PATH
    FROM (
        SELECT *
        , RANK() OVER (ORDER BY VIEWS DESC) AS RNK
        FROM USED_GOODS_BOARD
        JOIN USED_GOODS_FILE USING (BOARD_ID)
        ) RANK_TABLE
    WHERE RNK = 1
    ORDER BY FILE_ID DESC
    ;
-- 조건별로 분류하여 주문상태 출력하기
    SELECT
        ORDER_ID,
        PRODUCT_ID,
        DATE_FORMAT(OUT_DATE,'%Y-%m-%d') AS OUT_DATE,
        CASE
            WHEN DATEDIFF(OUT_DATE, '2022-05-01')<=0 THEN '출고완료'
            WHEN DATEDIFF(OUT_DATE, '2022-05-01')>0 THEN '출고대기'
            ELSE '출고미정'
        END AS '출고여부'
    FROM FOOD_ORDER
-- 대여 기록이 존재하는 자동차 리스트 구하기
    SELECT  h.CAR_ID
    FROM    CAR_RENTAL_COMPANY_RENTAL_HISTORY h
    LEFT JOIN CAR_RENTAL_COMPANY_CAR c
    ON      h.CAR_ID = c.CAR_ID
    WHERE   1=1
            AND CAR_TYPE = '세단'
            AND MONTH(START_DATE) = 10
    GROUP BY h.CAR_ID
    ORDER BY CAR_ID DESC;
-- 조건에 맞는 사용자 정보 조회하기
    SELECT  DISTINCT USER_ID,
            NICKNAME,
            CONCAT(CITY,' ', STREET_ADDRESS1, ' ', STREET_ADDRESS2) AS '전체주소',
            CONCAT(LEFT(TLNO,3),'-',MID(TLNO,4,4),'-',RIGHT(TLNO,4)) AS '전화번호'
    FROM (
        SELECT *, 
                COUNT(*) OVER(PARTITION BY WRITER_ID) AS WRITE_COUNT
        FROM    USED_GOODS_BOARD b
        LEFT JOIN USED_GOODS_USER u
        ON      b.WRITER_ID = u.USER_ID
        ) c
    WHERE WRITE_COUNT >= 3
    ORDER BY USER_ID DESC;
    -- 다른 사람 풀이
    SELECT USER_ID  
        , NICKNAME
        , CITY || ' ' || STREET_ADDRESS1 || ' ' || STREET_ADDRESS2 AS 전체주소
        , SUBSTR(TLNO, 1,3) || '-' || SUBSTR(TLNO, 4,4) || '-' || SUBSTR(TLNO, 8,4) AS 전화번호
    FROM USED_GOODS_USER
    WHERE 1 = 1
    AND USER_ID IN (SELECT WRITER_ID
                        FROM USED_GOODS_BOARD
                        WHERE 1=1
                        GROUP BY WRITER_ID
                    HAVING COUNT(*) >= 3)
    ORDER BY USER_ID DESC
-- 자동차 대여 기록 별 대여 금액 구하기
    WITH cte_fee
    AS (
        SELECT      *,
                    CASE
                        WHEN DATEDIFF(END_DATE, START_DATE)+1 BETWEEN 7 AND 29 THEN '7일 이상'
                        WHEN DATEDIFF(END_DATE, START_DATE)+1 BETWEEN 30 AND 89 THEN '30일 이상'
                        WHEN DATEDIFF(END_DATE, START_DATE)+1 >= 90 THEN '90일 이상'
                        ELSE '없음'
                    END AS '대여기록',
                    DATEDIFF(END_DATE, START_DATE)+1 AS '대여일'
        FROM        CAR_RENTAL_COMPANY_CAR
        LEFT JOIN   CAR_RENTAL_COMPANY_RENTAL_HISTORY
        USING       (CAR_ID)
        WHERE       CAR_TYPE = '트럭'
    )   

    SELECT 
        HISTORY_ID,
        ROUND(IF(discount_rate IS NULL, daily_fee*대여일, daily_fee * 대여일 - (daily_fee * 대여일 * discount_rate*0.01))) AS FEE
    FROM cte_fee f
    LEFT JOIN  CAR_RENTAL_COMPANY_DISCOUNT_PLAN p
    ON f.대여기록 = p.duration_type
    AND f.CAR_TYPE = p.CAR_TYPE
    ORDER BY FEE DESC, HISTORY_ID DESC;
-- 취소되지 않은 진료 예약 조회하기
    SELECT  a.APNT_NO, 
            p.PT_NAME, 
            p.PT_NO, 
            a.MCDP_CD, 
            d.DR_NAME, 
            a.APNT_YMD
    FROM    APPOINTMENT a
    INNER JOIN PATIENT p
    ON a.PT_NO = p.PT_NO
    INNER JOIN DOCTOR d
    ON a.MDDR_ID = d.DR_ID
    WHERE   1=1
            AND DATE_FORMAT(a.APNT_YMD, '%Y-%m-%d') = '2022-04-13'
            AND a.APNT_CNCL_YN != 'Y'
            AND a.MCDP_CD = 'CS'
    ORDER BY a.APNT_YMD;