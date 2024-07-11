package com.manajero.manajeroadnonbackend.Repositories;

import com.manajero.manajeroadnonbackend.Entities.Whatif;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WhatifRepository extends MongoRepository<Whatif, String> {
}
