CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  student_code VARCHAR(20) UNIQUE NOT NULL,
  program VARCHAR(100)
);

CREATE TABLE rooms (
  room_id SERIAL PRIMARY KEY,
  room_name VARCHAR(50) NOT NULL,
  room_location VARCHAR(100),
  capacidad INT
);

CREATE TABLE loans (
  loan_id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
  room_id INT REFERENCES rooms(room_id) ON DELETE CASCADE,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  duration INT
);
