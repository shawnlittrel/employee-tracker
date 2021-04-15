INSERT INTO departments (department_name)
VALUES
('Management'),
('Engineering'),
('Sales'),
('Installation'),
('Service');

INSERT INTO roles (title, salary, department_id)
VALUES
('General Manager', 100000, 1),
('Engineering Manager', 150000, 1),
('Sales Manager', 120000, 1),
('Field Manager', 95000, 1),
('Engineer', 100000, 2),
('Salesperson', 0, 3),
('Scheduler', 40000, 4),
('Install Technician', 40000, 4),
('Service Technician', 65000, 5); 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Francesca', 'January', 1, NULL),
('Misti', 'Glasscock', 2, 1),
('Winnie', 'Catalano', 3, 1),
('Jimmy', 'Buchler', 4, 1),
('Zelda', 'Cruzado', 5, 2),
('Abdul', 'Abler', 5, 2),
('Ilda', 'Mau', 6, 3),
('Maryanna', 'Odaniel', 6, 3),
('Nolan', 'Faulks', 6, 3),
('Kathleen', 'Leng', 6, 3),
('Chelsie', 'Manney', 7, 4),
('Nevada', 'Tomson', 7, 4),
('Nisha', 'Voges', 7, 4),
('Karry', 'Wallace', 8, 4),
('Lilliana', 'Leak', 8, 4),
('Tesha', 'Hinderliter', 8, 4),
('Vena', 'Cessna', 8, 4),
('Debby', 'Welke', 8, 4),
('Elton', 'Damewood', 8, 4),
('Abram', 'Spengler', 9, 4),
('Milan', 'Nalls', 9, 4),
('Lee', 'Farver', 9, 4),
('Larrain', 'Dhillon', 9, 4),
('Lashandra', 'Lines', 9, 4),
('Lahoma', 'Zang', 9 , 4),
('Kerri', 'Man', 5, 2),
('Forest', 'Bortz', 5, 2),
('Frances', 'Daw', 5, 2),
('Kyra', 'Engleman', 5, 2),
('Arica', 'Daily', 5, 2);