package com.manajero.manajeroadnonbackend.Repositories;

import com.manajero.manajeroadnonbackend.Entities.Alert;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface AlertRepository extends MongoRepository<Alert, String> {
}
