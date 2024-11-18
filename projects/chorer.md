---
name: 'Chorer'
headline: 'Household task management software'
languages: ['Next.js', 'MongoDB', 'TypeScript', 'Node.js', 'Express.js', 'Docker', 'Firebase']
month: 'Mar'
year: 2024
link: ['https://github.com/sd0e/chorer']
priority: 1
---

Chorer a web application and API allowing family members to assign tasks to one another. The tasks are given based on a schedule and proof of the task being completed must be approved by an administrator before rewards are distributed, which reduce in amount based on how overdue the task is. Notifications are sent to each individual user when new chores are assigned and when deadlines are approaching.

Data is stored in a number of MongoDB collections which are located within a Docker container in the API. Authentication is handled using Firebase Authentication, and every request to the server is sent with an authentication token; this is verified by the server on every request to ensure that users are allowed to access data.

Every household has members associated with multiple user access levels, including owner, administrator and member, as well as a pending level for users who have requested to join a household through a unique code and have not yet been approved or rejected by an administrator. These levels determine which pages the users are able to access (for example, members who are not administrators cannot access the admin console), and also restricts the data returned by the API to only data the user is allowed to access.