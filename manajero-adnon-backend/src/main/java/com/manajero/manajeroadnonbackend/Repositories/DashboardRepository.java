package com.manajero.manajeroadnonbackend.Repositories;

import com.manajero.manajeroadnonbackend.Entities.Dashboard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends MongoRepository<Dashboard, String> {
}
