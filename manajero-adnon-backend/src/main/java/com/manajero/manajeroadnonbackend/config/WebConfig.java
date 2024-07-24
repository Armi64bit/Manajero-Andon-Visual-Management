package com.manajero.manajeroadnonbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
          .allowedOrigins("http://localhost:4200") // Add your Angular application URL
          .allowedMethods("GET", "POST", "PUT", "DELETE") // Add the HTTP methods you want to allow
          .allowedHeaders("*") // Add the headers you want to allow
          .allowCredentials(true); // Allow credentials like cookies (if any)
      }
    };
  }
}
