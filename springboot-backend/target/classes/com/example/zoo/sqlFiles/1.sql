CREATE DATABASE IF NOT EXISTS zoo;
USE zoo;
CREATE TABLE test(
    test_id INT,
    test_name VARCHAR(20),
    PRIMARY KEY (test_id)
);

INSERT INTO test VALUES (1, "dawg");

CREATE TABLE visitor(
    visitor_id VARCHAR(10),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    phone VARCHAR(10),
    PRIMARY KEY (visitor_id)
);

INSERT INTO visitor VALUE("V1", "Bruce", "Wayne", "1234567890");

CREATE TABLE ticket(
    ticket_id VARCHAR(10),
    visitor_id VARCHAR(10),
    price float,
    PRIMARY KEY (ticket_id),
    FOREIGN KEY(visitor_id) REFERENCES visitor(visitor_id)
);

INSERT INTO ticket VALUE("t1", "V1", 200);

CREATE TABLE animal(
    animal_id VARCHAR(10),
    animal_name VARCHAR(20),
    animal_species VARCHAR(30),
    habitat VARCHAR(20),
    PRIMARY KEY (animal_id)
);


CREATE TABLE health_record(
    animal_id VARCHAR(10) PRIMARY KEY,
    vaccination_details VARCHAR(50),
    illness_details VARCHAR(50),
    FOREIGN KEY(animal_id) REFERENCES animal(animal_id)
);

INSERT INTO animal VALUES ('1', 'Lion', 'Panthera leo', 'Savannah'), ('2', 'Elephant', 'Loxodonta africana', 'Savannah');
INSERT INTO health_record VALUES('1', 'Vaccinated', 'Healthy'), ('2', 'Unvaccinated', 'Flu');
CREATE TABLE staff(
    staff_id VARCHAR(10) PRIMARY KEY,
    staff_name VARCHAR(30),
    staff_role VARCHAR(20),
    staff_level INT DEFAULT 0
);

INSERT INTO staff VALUE('1', 'John Doe', 'ZooKeeper', 3);
INSERT INTO staff VALUE('M1', 'Mann Edgar', 'ZooManager', 3);
> insert into staff value('M3', 'Jane Doe', 'ZooManager', 1);

CREATE TABLE item(
    item_id VARCHAR(10) PRIMARY KEY,
    item_name VARCHAR(20),
    quantity INT DEFAULT 0
);

CREATE TABLE staffLogin(
    staff_id VARCHAR(10) PRIMARY KEY,
    staff_password VARCHAR(20),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);
INSERT INTO staffLogin VALUE('1', 'D03');

CREATE TABLE assigned_animal(
    animal_id VARCHAR(10) PRIMARY KEY,
    staff_id VARCHAR(10),
    FOREIGN KEY (animal_id) REFERENCES animal(animal_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);
INSERT INTO assigned_animal VALUES ('1', '1'), ('2', '1');

