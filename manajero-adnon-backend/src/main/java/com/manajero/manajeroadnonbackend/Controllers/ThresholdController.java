package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Entities.Threshold;
import com.manajero.manajeroadnonbackend.Services.ThresholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/thresholds")
public class ThresholdController {

  @Autowired
  private ThresholdService thresholdService;

  @GetMapping
  public List<Threshold> getAllThresholds() {
    return thresholdService.getAllThresholds();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Threshold> getThresholdById(@PathVariable String id) {
    Optional<Threshold> threshold = thresholdService.getThresholdById(id);
    if (threshold.isPresent()) {
      return ResponseEntity.ok(threshold.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public Threshold createThreshold(@RequestBody Threshold threshold) {
    return thresholdService.createThreshold(threshold);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Threshold> updateThreshold(@PathVariable String id, @RequestBody Threshold threshold) {
    if (thresholdService.getThresholdById(id).isPresent()) {
      Threshold updatedThreshold = thresholdService.updateThreshold(id, threshold);
      return ResponseEntity.ok(updatedThreshold);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteThreshold(@PathVariable String id) {
    if (thresholdService.getThresholdById(id).isPresent()) {
      thresholdService.deleteThreshold(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
