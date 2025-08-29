package com.fourtech.proyecto_fourtech.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fourtech.proyecto_fourtech.modelo.Productos;
import com.fourtech.proyecto_fourtech.repositorio.ProductosRepository;

@Service
public class ProductosServices {

    @Autowired
    private ProductosRepository repo_productos;

    public List<Productos> listarPorCategoria(Integer categoriaId) {
        return repo_productos.findByCategoria_IdCategoria(categoriaId);
    }

}
