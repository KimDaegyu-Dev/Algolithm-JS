-- 경기도에 위치한 식품창고 목록 출력하기
    SELECT
        WAREHOUSE_ID,
        WAREHOUSE_NAME,
        ADDRESS,
        IFNULL(FREEZER_YN, 'N') AS FREEZER_YN
    FROM FOOD_WAREHOUSE
    WHERE ADDRESS LIKE '%경기도%'
    ORDER BY WAREHOUSE_ID;
-- 이름이 없는 동물의 아이디
    SELECT
        ANIMAL_ID
    FROM ANIMAL_INS
    WHERE NAME IS NULL
    ORDER BY ANIMAL_ID;
-- 이름이 있는 동물의 아이디
    SELECT
        ANIMAL_ID
    FROM
        ANIMAL_INS
    WHERE
        NAME IS NOT NULL
    ORDER BY ANIMAL_ID;
-- NULL 처리하기
    SELECT
        ANIMAL_TYPE,
        IFNULL(NAME, 'No name'),
        SEX_UPON_INTAKE
    FROM ANIMAL_INS;
-- 나이 정보가 없는 회원 수 구하기
    SELECT
        COUNT(*) AS USERS
    FROM USER_INFO
    WHERE AGE IS NULL;
-- ROOT 아이템 구하기
    SELECT
        t.ITEM_ID,
        ITEM_NAME
    FROM ITEM_TREE t
    JOIN ITEM_INFO i
    ON t.ITEM_ID = i.ITEM_ID
    WHERE PARENT_ITEM_ID IS NULL
    ORDER BY t.ITEM_ID;
-- 업그레이드 할 수 없는 아이템 구하기
        WITH cte_can_upgrade
    AS (
        SELECT
            ITEM_ID
        FROM ITEM_TREE
        WHERE ITEM_ID IN (SELECT PARENT_ITEM_ID  FROM ITEM_TREE)
        )

    SELECT
        t.ITEM_ID,
        ITEM_NAME,
        RARITY
    FROM ITEM_TREE t
    JOIN ITEM_INFO i
    ON t.ITEM_ID = i.ITEM_ID
    WHERE 
        t.ITEM_ID 
            NOT IN (
                    SELECT ITEM_ID 
                    FROM cte_can_upgrade
            )
    ORDER BY t.ITEM_ID DESC;
    -- 다른 사람 풀이
    SELECT ITEM_ID, ITEM_NAME, RARITY
    FROM ITEM_INFO
    WHERE ITEM_ID NOT IN
        (
        SELECT PARENT_ITEM_ID FROM ITEM_TREE WHERE PARENT_ITEM_ID IS NOT NULL
        )
    ORDER BY ITEM_ID DESC
-- 잡은 물고기의 평균 길이 구하기
    SELECT 
        ROUND(AVG(COALESCE(LENGTH,10)),2) AS AVERAGE_LENGTH
    FROM FISH_INFO;