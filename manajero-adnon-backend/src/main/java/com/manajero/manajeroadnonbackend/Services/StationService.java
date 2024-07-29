package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Repositories.StationRepository;
import com.manajero.manajeroadnonbackend.Entities.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StationService {

  @Autowired
  private StationRepository stationRepository;

  public List<Station> getAllStations() {
    return stationRepository.findAll();
  }

  public Optional<Station> getStationById(String id) {
    return stationRepository.findById(id);
  }

  public Station createStation(Station station) {
    return stationRepository.save(station);
  }

  public Station updateStation(String id, Station station) {
    station.setId(id);
    return stationRepository.save(station);
  }

  public void deleteStation(String id) {
    stationRepository.deleteById(id);
  }
}
