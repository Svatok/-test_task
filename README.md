# -test_task
 Test task for ruby rails course

The results of the test task for ruby rails course you can see here.

For test APP:
login: test@test.com
Pass: test

#SQL Task:

All queries were tested in the MySql database.

##Given tables:
* tasks (id, name, status, project_id)
* projects (id, name)

##Queries:
1.	Get all statuses, not repeating, alphabetically ordered.
```SELECT DISTINCT status FROM tasks ORDER BY status```

2.	Get the count of all tasks in each project, order by tasks count descending.
SELECT p.name as project_name, count(t.id) as count_tasks FROM projects p LEFT JOIN tasks t ON  t.project_id = p.id  GROUP BY project_name ORDER BY count_tasks DESC

3.	Get the count of all tasks in each project, order by project names. 
SELECT p.name as project_name, count(t.id) as count_tasks FROM projects p LEFT JOIN tasks t ON  t.project_id = p.id  GROUP BY project_name ORDER BY project_name

4.	Get the tasks for all projects having the name beginning with “N” letter.
SELECT t.name as task_name, p.name as project_name FROM tasks t, projects p WHERE p.name LIKE "N%" AND t.project_id = p.id

5.	Get the list of all projects containing the “a” letter in the middle of the name, and show the tasks count near each project. Mention that there can exist projects without tasks and tasks with project_id=NULL.
SELECT p.name as project_name, count(t.id) as count_tasks FROM projects p LEFT JOIN tasks t on t.project_id = p.id WHERE p.name LIKE "%a%" AND p.name NOT LIKE "a%" AND p.name NOT LIKE "%a" GROUP BY project_name

6.	Get the list of tasks with duplicate names. Order alphabetically.
SELECT name FROM tasks GROUP BY name HAVING count(*)>1 ORDER BY name

7.	Get the list of tasks having several exact matches of both name and status, from the project `Garage`. Order by matches count. 
SELECT t.name, t.status, COUNT(*) as task_count FROM tasks t, projects p WHERE p.name="Garage" AND t.project_id = p.id GROUP BY t.name, t.status HAVING count(*)>1 ORDER BY task_count

8.	Get the list of project names having more than 10 tasks in status `completed`. Order by project_i.
SELECT p.name FROM projects p WHERE EXISTS (SELECT 1 FROM tasks t WHERE p.id=t.project_id AND t.status="completed" HAVING count(*)>10) ORDER BY p.id

If we want to see the number of completed tasks:
SELECT p.name, count(*) FROM projects p, tasks t WHERE t.project_id=p.id AND t.status=" completed " GROUP BY p.name HAVING count(*)>10 ORDER BY p.id
