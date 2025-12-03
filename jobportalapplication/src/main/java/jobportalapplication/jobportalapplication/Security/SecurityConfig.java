    package jobportalapplication.jobportalapplication.Security;
    
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.CorsConfigurationSource;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
    
    import java.util.Arrays;
    
    @Configuration
    @EnableMethodSecurity // allows @PreAuthorize
    public class SecurityConfig {
    
        private final JwtUtil jwtUtil;
    
        public SecurityConfig(JwtUtil jwtUtil) {
            this.jwtUtil = jwtUtil;
        }
    
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            JwtAuthFilter jwtFilter = new JwtAuthFilter(jwtUtil);
    
            http
                    .csrf(AbstractHttpConfigurer::disable)
                    .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                    .authorizeHttpRequests(auth -> auth
    
                            // Public APIs
                            .requestMatchers("/api/auth/login", "/api/auth/signup", "/api/auth/all").permitAll()
                            .requestMatchers("/api/resume/**").permitAll()
                            .requestMatchers("/api/payment/**").permitAll()
    
    
                            // Anyone can view & apply jobs
                            .requestMatchers("/jobportal/jobs/apply").permitAll()
                            .requestMatchers("/jobportal/jobs", "/jobportal/jobs/**").permitAll()
    
                            // Only ADMIN can upload/view all applications
                            .requestMatchers("/jobportal/jobs/admin/**").hasRole("ADMIN")
    
                            // Profile pages require login
                            .requestMatchers("/api/profile/**").authenticated()
    
                            // Everything else requires authentication
                            .anyRequest().authenticated()
                    )
                    .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    
            // Allow H2 console
            http.headers(headers -> headers.frameOptions(frame -> frame.disable()));
    
            return http.build();
        }
    
        // CORS
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration config = new CorsConfiguration();
    
            config.setAllowCredentials(true);
            config.setAllowedOrigins(Arrays.asList(
                    "http://localhost:5173",
                    "http://localhost:3000",
                    "http://127.0.0.1:5173"
            ));
            config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
            config.setExposedHeaders(Arrays.asList("Authorization"));
    
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", config);
            return source;
        }
    
        @Bean
        public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
            return http.getSharedObject(AuthenticationManager.class);
        }
    
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }
