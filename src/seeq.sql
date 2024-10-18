-- Create Regions
INSERT INTO region (name) VALUES ('Singapore');
INSERT INTO region (name) VALUES ('US');

-- Create Questions for Singapore
INSERT INTO question (content, region_id) 
SELECT 'Singapore Question ' || generate_series(1, 5), id 
FROM region WHERE name = 'Singapore';

-- Create Questions for US
INSERT INTO question (content, region_id) 
SELECT 'US Question ' || generate_series(1, 5), id 
FROM region WHERE name = 'US';

-- Create Cycles
INSERT INTO cycle (start_date, end_date, duration_days)
SELECT 
    (timestamp '2024-10-21 19:00:00' + (interval '7 days' * (generate_series(0, 4)))),
    (timestamp '2024-10-21 19:00:00' + (interval '7 days' * (generate_series(1, 5))) - interval '1 second'),
    7
FROM generate_series(0, 4);

-- Create QuestionAssignments
WITH singapore_questions AS (
    SELECT q.id, ROW_NUMBER() OVER () as rn
    FROM question q
    JOIN region r ON q.region_id = r.id
    WHERE r.name = 'Singapore'
),
us_questions AS (
    SELECT q.id, ROW_NUMBER() OVER () as rn
    FROM question q
    JOIN region r ON q.region_id = r.id
    WHERE r.name = 'US'
),
cycles AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY start_date) as rn
    FROM cycle
)
INSERT INTO question_assignment (question_id, cycle_id, region_id)
SELECT 
    sq.id, c.id, r.id
FROM singapore_questions sq
JOIN cycles c ON sq.rn = c.rn
JOIN region r ON r.name = 'Singapore'
UNION ALL
SELECT 
    uq.id, c.id, r.id
FROM us_questions uq
JOIN cycles c ON uq.rn = c.rn
JOIN region r ON r.name = 'US';