CREATE DATABASE IF NOT EXISTS todo_app_emer;
USE todo_app_emer;
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
)