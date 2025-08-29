drop database if exists fourtech;
create database fourtech;
use fourtech;

-- Tabla de los usuarios
create table usuarios(
	id_usuario int primary key auto_increment,
	nombres varchar(50) not null,
	apellidos varchar(50) not null,
	email varchar(100) not null unique,
	contra varchar(255) not null,
    telefono VARCHAR(9),
    direccion VARCHAR(255)
);

-- Tabla de categorias
create table categorias(
	id_categoria int primary key auto_increment,
	categoria varchar(50) not null
);

-- Tabla de productos
create table productos(
	id_producto int primary key auto_increment,
	producto varchar(100) not null,
	foto varchar(255),
    precio decimal(10,2) not null,
    id_categoria int not null,
    foreign key (id_categoria) references categorias(id_categoria)
);

-- Categorías
INSERT INTO categorias (categoria) VALUES 
('Computadoras'),
('Laptops'),
('Accesorios');

-- Productos de ejemplo
INSERT INTO productos (producto, foto, precio, id_categoria) VALUES 
-- Computadoras
('PC Gamer Haku RGB AMD Ryzen 5 5600GT 16GB RAM 1TB SSD', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400', 1799.00, 1),
('PC Gamer Intel Core i7 12700F 32GB RAM 1TB SSD RTX 3070', 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400', 2999.00, 1),
('PC Workstation AMD Ryzen 9 5900X 64GB RAM 2TB SSD', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400', 4499.00, 1),
('PC Gamer HP RGB i5 4800GT 16GB RAM 1TB SSD', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400', 2399.00, 1),
('PC Intel Core i3 N-350 8GB RAM 512GB SSD', 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400', 1299.00, 1),
('PC AMD Ryzen 5 1800X 16GB RAM 1TB SSD', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400', 2599.00, 1),

-- Laptops
('Laptop Lenovo Intel Core i3 13va gen 8GB RAM 256GB SSD 15.6 FHD Win 11 Pro', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 1379.00, 2),
('Laptop HP Pavilion Intel Core i5 16GB RAM 512GB SSD 14 FHD', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400', 1899.00, 2),
('Laptop ASUS ROG Strix G15 AMD Ryzen 7 16GB RAM 1TB SSD RTX 3060', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', 3299.00, 2),
('Laptop MacBook Air M2 8GB RAM 256GB SSD 13.6 Retina', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 4199.00, 2),
('Laptop Dell Inspiron 15 Intel Core i7 16GB RAM 512GB SSD', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', 2199.00, 2),

-- Accesorios
('Auricular Logitech H111 Estéreo con Micrófono', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 49.00, 3),
('Teclado Mecánico Corsair K95 RGB Platinum XT', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400', 299.00, 3),
('Mouse Gamer Razer DeathAdder V3 Pro Wireless', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 189.00, 3),
('Monitor LG 27 4K UHD IPS HDR10', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', 899.00, 3),
('Webcam Logitech C920 HD Pro 1080p', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400', 129.00, 3),
('Altavoces Logitech Z313 2.1 con Subwoofer', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400', 89.00, 3),
('Disco Duro Externo Seagate 1TB USB 3.0', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400', 159.00, 3);


select * from usuarios;
select * from categorias;
select * from productos;

select p.id_producto, p.producto, p.foto, p.precio, c.id_categoria, c.categoria from productos p join categorias c on p.id_categoria = c.id_categoria;