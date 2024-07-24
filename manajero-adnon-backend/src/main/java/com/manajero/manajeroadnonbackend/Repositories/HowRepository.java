package com.manajero.manajeroadnonbackend.Repositories;

import com.manajero.manajeroadnonbackend.Entities.How;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HowRepository extends MongoRepository<How, String> {
}
