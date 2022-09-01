USE teamDirectory_db;
INSERT INTO departments (dept_name)
VALUES  ("Management"), 
        ("Engineering"), 
        ("Sales"), 
        ("Supply Chain"), 
        ("HR"), 
        ("Finance");

INSERT INTO roles (title, department_id, salary)
VALUES  ("CEO", 1, 280000),
        ("Director", 1, 210000),
        ("Senior Developer", 2, 180000),
        ("Developer", 2, 140000),
        ("Sales Lead", 3, 120000),
        ("Sales Representative", 3, 75000),
        ("Department Lead", 4, 110000),
        ("Fulfillment Associate", 4, 75000),
        ("Procurement Associate", 4, 75000),
        ("HR Representative", 5, 80000),
        ("HR Assistant", 5, 65000),
        ("CPA", 6, 90000),
        ("AP", 6, 75000);

INSERT INTO employees (last_name, first_name, manager_id, role_id)
VALUES  ("Gaffer", "Magnus", 1, 1),
        ("Smith", "Bob", 1, 2),
        ("Brown", "Kevin", 2, 2),
        ("Johnson", "Ernie", 3,5),
        ("Wells", "Tim", 4, 6);


        
