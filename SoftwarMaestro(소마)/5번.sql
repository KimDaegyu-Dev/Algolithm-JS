-- id worker_id enter_at leave_at
WITH cte_work_on_april
AS
(
    SELECT worker_id,
        COUNT(worker_id) AS working_day 
    FROM   working_log
    WHERE  enter_at LIKE '2023-04%'
    GROUP BY worker_id;
)
SELECT  a.worker_id,
        COALESCE(b.working_day, 0) AS working_day
FROM working_log a
LEFT JOIN cte_work_on_april b
ON a.worker_id = b.worker_id
GROUP BY a.worker_id
ORDER BY a.worker_id DESC;