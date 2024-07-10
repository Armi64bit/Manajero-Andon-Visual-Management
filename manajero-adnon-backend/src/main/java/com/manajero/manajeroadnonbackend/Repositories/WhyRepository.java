package com.manajero.manajeroadnonbackend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WhyRepository extends MongoRepository<com.manajero.manajeroadnonbackend.Entities.Why, String> {
}
