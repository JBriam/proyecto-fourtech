package com.fourtech.proyecto_fourtech.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fourtech.proyecto_fourtech.modelo.Usuario;
import com.fourtech.proyecto_fourtech.repositorio.UsuarioRepository;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email);
        
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario no encontrado: " + email);
        }
        
        // Usar el nombre completo como username para mostrar en la interfaz
        String nombreCompleto = usuario.getNombres() + " " + usuario.getApellidos();
        
        return User.builder()
                .username(nombreCompleto) // Mostrar nombre completo en lugar del email
                .password(usuario.getPassword()) // Usar getPassword() que es el método correcto
                .authorities("USER")
                .build();
    }
}
