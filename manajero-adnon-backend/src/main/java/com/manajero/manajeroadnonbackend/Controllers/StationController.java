package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Entities.Station;
import com.manajero.manajeroadnonbackend.Services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stations")
public class StationController {

  @Autowired
  private StationService stationService;

  @GetMapping
  public List<Station> getAllStations() {
    return stationService.getAllStations();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Station> getStationById(@PathVariable String id) {
    Optional<Station> station = stationService.getStationById(id);
    if (station.isPresent()) {
      return ResponseEntity.ok(station.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public Station createStation(@RequestBody Station station) {
    return stationService.createStation(station);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Station> updateStation(@PathVariable String id, @RequestBody Station station) {
    Optional<Station> existingStation = stationService.getStationById(id);
    if (existingStation.isPresent()) {
      Station updatedStation = stationService.updateStation(id, station);
      return ResponseEntity.ok(updatedStation);
    } else {
      return ResponseEntity.notFound().build();
    }
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteStation(@PathVariable String id) {
    if (stationService.getStationById(id).isPresent()) {
      stationService.deleteStation(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
