package com.manajero.manajeroadnonbackend.Repositories;

import com.manajero.manajeroadnonbackend.Entities.Station;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StationRepository extends MongoRepository<Station, String> {
  List<Station> findByDashboardId(String dashboardId);

}
