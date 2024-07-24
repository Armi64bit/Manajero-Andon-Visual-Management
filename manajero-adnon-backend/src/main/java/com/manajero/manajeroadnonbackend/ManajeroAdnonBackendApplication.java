package com.manajero.manajeroadnonbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
@SpringBootApplication
public class ManajeroAdnonBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManajeroAdnonBackendApplication.class, args);
    }

}
