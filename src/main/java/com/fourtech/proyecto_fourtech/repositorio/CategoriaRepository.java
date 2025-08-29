package com.fourtech.proyecto_fourtech.repositorio;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fourtech.proyecto_fourtech.modelo.CategoriaProductos;

@Repository
public interface CategoriaRepository extends JpaRepository<CategoriaProductos, Long>{
    //List<Productos> findByProductos() 
}
