INSERT INTO department (id, name)
VALUES  (1, "Management"), 
        (2, "Engineering"), 
        (3, "Sales"), 
        (4, "Supply Chain"), 
        (5, "HR"), 
        (6, "Finance");

INSERT INTO roles (id, title, department_id, salary )
VALUES  (1, "CEO", 1, 280000),
        (2, "Director", 1, 210000),
        (3, "Senior Developer", 2, 180000),
        (4, "Developer", 2, 140000),
        (5, "Sales Lead", 3, 120000),
        (6, "Sales Representative", 3, 75000),
        (7, "Department Lead", 4, 110000),
        (8, "Fulfillment Associate", 4, 75000),
        (9, "Procurement Associate", 4, 75000),
        (10, "HR Representative", 5, 80000),
        (11, "HR Assistant", 5, 65000),
        (12, "CPA", 6, 90000),
        (13, "AP", 6, 75000);

INSERT INTO employees (id, last_name, first_name, manager, roles_id, title)
VALUES  (1, "Gaffer", "Magnus", null, 1, "CEO"),
        (2, "Hagen", "Tom", null, 2, "COO"),
