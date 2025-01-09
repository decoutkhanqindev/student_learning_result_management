- Student endpoints
1. GET /student/all: Get all student information.
2. GET /student/:id: Get student information by ID.
3. POST /student: Add new student.
4. PUT /student/:id: Update student information.
5. DELETE /student/:id: Delete student by ID.

- Subject endpoints
1. GET /subject/all: Get all subjects.
2. GET /subject/:id: Get subject information by ID.
3. POST /subject: Add new subject.
4. PUT /subject/:id: Update subject.
5. DELETE /subject/:id: Delete subject by ID.

- Grade endpoints
1. GET /grade/:student_id/:subject_id: Get student scores by subject.
2. POST /grade: Add student scores (by subject).
3. PUT /grade/:id: Update scores.
4. DELETE /grade/:id: Delete student grades.