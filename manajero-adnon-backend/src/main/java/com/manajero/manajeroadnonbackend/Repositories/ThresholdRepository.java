package com.manajero.manajeroadnonbackend.Repositories;

import com.manajero.manajeroadnonbackend.Entities.Threshold;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ThresholdRepository extends MongoRepository<Threshold, String> {
}
