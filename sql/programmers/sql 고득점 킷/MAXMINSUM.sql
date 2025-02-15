-- 가격이 제일 비싼 식품의 정보 출력하기
    SELECT
        PRODUCT_ID,
        PRODUCT_NAME,
        PRODUCT_CD,
        CATEGORY,
        PRICE
    FROM FOOD_PRODUCT
    GROUP BY PRODUCT_ID
    ORDER BY PRICE DESC
    LIMIT 1;
    -- 다른 사람 풀이
    SELECT PRODUCT_ID,PRODUCT_NAME,PRODUCT_CD,CATEGORY,PRICE
    FROM FOOD_PRODUCT
    WHERE PRICE = (
        SELECT MAX(PRICE)
        FROM FOOD_PRODUCT);
-- 최댓값 구하기
    SELECT
        DATETIME
    FROM ANIMAL_INS
    ORDER BY DATETIME DESC
    LIMIT 1;
    -- 다른 사람 풀이
    SELECT DATETIME 
    FROM ANIMAL_INS
    WHERE DATETIME = (
        SELECT MAX(DATETIME)
        FROM ANIMAL_INS
        )
-- 최솟값 구하기
    SELECT
        DATETIME
    FROM ANIMAL_INS
    WHERE DATETIME = (
        SELECT MIN(DATETIME)
        FROM ANIMAL_INS
    );
    -- 다른 사람 풀이
    SELECT MIN(DATETIME)
    FROM ANIMAL_INS

-- 동물 수 구하기
    SELECT
        COUNT(ANIMAL_ID) AS count
    FROM ANIMAL_INS;

-- 중복 제거하기
    SELECT
        COUNT(NAME) AS count
    FROM (
        SELECT DISTINCT NAME
        FROM ANIMAL_INS
    ) as d;
-- 가장 비싼 상품 구하기
    SELECT
        MAX(PRICE) AS MAX_PRICE
    FROM PRODUCT
-- 조건에 맞는 아이템들의 가격의 총합 구하기
    SELECT
        SUM(PRICE) AS TOTAL_PRICE
    FROM ITEM_INFO
    WHERE RARITY = 'LEGEND';
-- 잡은 물고기 중 가장 큰 물고기의 길이 구하기
    SELECT
        CONCAT(MAX(LENGTH),'cm') AS MAX_LENGTH
    FROM FISH_INFO;
-- 연도별 대장균 크기의 편차 구하기
    SELECT
        YEAR(DIFFERENTIATION_DATE) AS YEAR,
        MAX(SIZE_OF_COLONY) OVER(PARTITION BY YEAR(DIFFERENTIATION_DATE)) - SIZE_OF_COLONY AS YEAR_DEV,
        ID
    FROM ECOLI_DATA
    ORDER BY 1, 2;
-- 물고기 종류 별 대어 찾기
    SELECT 
        ID,
        FISH_NAME,
        LENGTH
    FROM FISH_INFO i
    JOIN FISH_NAME_INFO n
    ON i.FISH_TYPE=n.FISH_TYPE
    WHERE 
        (i.FISH_TYPE, LENGTH) 
        IN (
        SELECT 
            FISH_TYPE,
            MAX(LENGTH)
        FROM FISH_INFO
        GROUP BY FISH_TYPE)
    ORDER BY ID;