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
1. GET /grade/all: Get all grades
2. GET /grade/:student_id/:subject_id: Get student grade by subject.
3. GET /grade/:studentId: Get all grades by student
4. POST /grade: Add student scores by subject.
5. PUT /grade/:student_id/:subject_id: Update score.
6. DELETE /grade/:student_id/:subject_id: Delete student grade.
