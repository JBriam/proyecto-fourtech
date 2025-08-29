package com.fourtech.proyecto_fourtech.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fourtech.proyecto_fourtech.Services.ProductosServices;
import com.fourtech.proyecto_fourtech.modelo.Productos;
import com.fourtech.proyecto_fourtech.modelo.Usuario;
import com.fourtech.proyecto_fourtech.repositorio.UsuarioRepository;

@Controller
public class ProductoController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductosServices services_pro;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/")
    public String inicio(Model model) {
        Integer idCategoria = 1;
        List<Productos> productos = services_pro.listarPorCategoria(idCategoria);
        model.addAttribute("productos", productos);
        return "index";
    }

    @GetMapping("/computadoras")
    public String listarPcs(Model model) {
        Integer idCategoria = 1;
        List<Productos> productos = services_pro.listarPorCategoria(idCategoria);
        model.addAttribute("productos", productos);
        return "computadoras";
    }

    @GetMapping("/laptops")
    public String listarLaptops(Model model) {
        Integer idCategoria = 2;
        List<Productos> productos = services_pro.listarPorCategoria(idCategoria);
        model.addAttribute("productos", productos);
        return "laptops";
    }

    @GetMapping("/accesorios")
    public String listarAccesorios(Model model) {
        Integer idCategoria = 3;
        List<Productos> productos = services_pro.listarPorCategoria(idCategoria);
        model.addAttribute("productos", productos);
        return "accesorios";
    }

    @GetMapping("/registro")
    public String mostrarRegistro(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "registro";
    }

    @GetMapping("/usuarios")
    public String mostrarUsuariosRegistrados(Model model) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        model.addAttribute("usuarios", usuarios);
        return "usuarios";
    }

    @PostMapping("/registro")
    public String registrarUsuario(@ModelAttribute Usuario usuario, RedirectAttributes redirectAttributes) {
        try {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            usuarioRepository.save(usuario);
            redirectAttributes.addFlashAttribute("mensaje", "Usuario registrado exitosamente");
            return "redirect:/login";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al registrar usuario: " + e.getMessage());
        }
        return "redirect:/registro";
    }

    @GetMapping("/login")
    public String mostrarLogin() {
        return "login";
    }
}