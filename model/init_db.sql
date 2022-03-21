DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    given_name VARCHAR(250) NOT NULL,
    family_name VARCHAR(250) NOT NULL,
    bio VARCHAR(250) NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    picture VARCHAR(300) NOT NULL
);

INSERT INTO users (given_name, family_name, bio, email, picture)
VALUES
    ('Holly', 'Hanley', 'Awesome junior developer', 'holly@gmail.com', "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
    ('Gaby', 'Pineda', 'Awesome junior developer', 'gaby@gmail.com', "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80");


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
    ('Test project 1', 'Lorem ipsum 1 the before times no march madness Mr. Peanut. Ballot lockdown Quibi whipped coffee no march madness', "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
    ('Test project 2', 'Lorem ipsum 2 the before times no march madness Mr. Peanut. Ballot lockdown Quibi whipped coffee no march madness', "https://media.istockphoto.com/photos/multiple-screens-virtual-media-projection-concept-picture-id1289901483?b=1&k=20&m=1289901483&s=170667a&w=0&h=o2N9V6lLLD3wFkSgzYwGMCwPqM5eMZzfsrpEpZN5ALg="),
    ('Test project 3', 'Lorem ipsum 3 the before times no march madness Mr. Peanut. Ballot lockdown Quibi whipped coffee no march madness', "https://images.unsplash.com/photo-1570989086575-503363bb091b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60"),
    ('Test project 4', 'Lorem ipsum 4 the before times no march madness Mr. Peanut. Ballot lockdown Quibi whipped coffee no march madness', "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"),
    ('Test project 5', 'Lorem ipsum 5 the before times no march madness Mr. Peanut. Ballot lockdown Quibi whipped coffee no march madness', "https://images.unsplash.com/photo-1647440076173-d7e80d86c115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"),
    ('Test project 6', 'Lorem ipsum 6 the before times no march madness Mr. Peanut. Ballot lockdown Quibi whipped coffee no march madness', "https://images.unsplash.com/photo-1647724063460-89771298b3a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60")