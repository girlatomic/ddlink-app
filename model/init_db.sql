DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    bio VARCHAR(250) NOT NULL
);

INSERT INTO users (first_name, last_name, bio)
VALUES
    ('Holly', 'Hanley', 'Awesome junior developer'),
    ('Gaby', 'Pineda', 'Awesome junior developer');


DROP TABLE IF EXISTS skills;

CREATE TABLE skills (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    s_role VARCHAR(100) NOT NULL,
    skill_name VARCHAR(250) NOT NULL
);

INSERT INTO skills (s_role, skill_name)
VALUES
    ('Designer', 'ux'),
    ('Developer', 'react');


DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    p_name VARCHAR(250) NOT NULL,
    p_description VARCHAR(250) NOT NULL,
    p_img VARCHAR(300)
);

INSERT INTO projects (p_name, p_description, p_img)
VALUES
    ('Test project 1', 'Ecommerce website', "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
    ('Test project 2', 'Portfolio website', "https://media.istockphoto.com/photos/multiple-screens-virtual-media-projection-concept-picture-id1289901483?b=1&k=20&m=1289901483&s=170667a&w=0&h=o2N9V6lLLD3wFkSgzYwGMCwPqM5eMZzfsrpEpZN5ALg=")