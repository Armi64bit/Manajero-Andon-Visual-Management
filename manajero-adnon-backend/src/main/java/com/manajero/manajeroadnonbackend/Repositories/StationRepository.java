package com.manajero.manajeroadnonbackend.Repositories;

import com.manajero.manajeroadnonbackend.Entities.Station;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StationRepository extends MongoRepository<Station, String> {
}
