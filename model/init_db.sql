SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS projects_skills;
DROP TABLE IF EXISTS users_skills;
SET foreign_key_checks = 1;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    given_name VARCHAR(250) NOT NULL,
    family_name VARCHAR(250) NOT NULL,
    bio VARCHAR(250) NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    picture VARCHAR(300) NOT NULL,
    s_role VARCHAR (100) NULL
);

INSERT INTO users (given_name, family_name, bio, email, picture, s_role)
VALUES
    ('Holly', 'Hanley', 'Awesome junior developer', 'holly@gmail.com', "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "Developer"),
    ('Gaby', 'Pineda', 'Awesome junior developer', 'gaby@gmail.com', "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80", "Designer");
    
   



CREATE TABLE skills (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    s_role VARCHAR(100) NOT NULL,
    skill_name VARCHAR(250) NOT NULL
);

INSERT INTO skills (s_role, skill_name)
VALUES
    ('Designer', 'UX'),
    ('Designer', 'Figma'),
    ('Designer', 'Prototyping'),
    ('Designer', 'Animation'),
    ('Developer', 'Javascript'),
    ('Developer', 'HTML'),
    ('Developer', 'Angular'),
    ('Developer', 'React');



CREATE TABLE projects (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    p_name VARCHAR(250) NOT NULL,
    p_description VARCHAR(250) NOT NULL,
    p_img VARCHAR(300)
);

INSERT INTO projects (p_name, p_description, p_img)
VALUES
    ('Test project 1', 'Ecommerce website', "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
    ('Test project 2', 'Portfolio website', "https://media.istockphoto.com/photos/multiple-screens-virtual-media-projection-concept-picture-id1289901483?b=1&k=20&m=1289901483&s=170667a&w=0&h=o2N9V6lLLD3wFkSgzYwGMCwPqM5eMZzfsrpEpZN5ALg=");


CREATE TABLE projects_skills (
    projectId INT NOT NULL,
    skillId INT NOT NULL,
    PRIMARY KEY (projectId, skillId),
    FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (skillId) REFERENCES skills(id) ON DELETE CASCADE
);

INSERT INTO projects_skills (projectId, skillId)
VALUES
    (1, 5),
    (1, 6),
    (1, 8),
    (2, 1),
    (2, 2),
    (2, 3);

CREATE TABLE users_skills (
    userId INT NOT NULL,
    skillId INT NOT NULL,
    PRIMARY KEY (userId, skillId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skillId) REFERENCES skills(id) ON DELETE CASCADE
);

INSERT INTO users_skills (userId, skillId)
VALUES
    (2, 5),
    (2, 6),
    (2, 8);
