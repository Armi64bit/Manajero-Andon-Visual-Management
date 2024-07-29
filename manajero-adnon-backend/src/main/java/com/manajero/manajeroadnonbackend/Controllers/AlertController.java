package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Entities.Alert;
import com.manajero.manajeroadnonbackend.Services.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

  @Autowired
  private AlertService alertService;

  @GetMapping
  public List<Alert> getAllAlerts() {
    return alertService.getAllAlerts();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Alert> getAlertById(@PathVariable String id) {
    Optional<Alert> alert = alertService.getAlertById(id);
    if (alert.isPresent()) {
      return ResponseEntity.ok(alert.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public Alert createAlert(@RequestBody Alert alert) {
    return alertService.createAlert(alert);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Alert> updateAlert(@PathVariable String id, @RequestBody Alert alert) {
    if (alertService.getAlertById(id).isPresent()) {
      Alert updatedAlert = alertService.updateAlert(id, alert);
      return ResponseEntity.ok(updatedAlert);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAlert(@PathVariable String id) {
    if (alertService.getAlertById(id).isPresent()) {
      alertService.deleteAlert(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
