package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Repositories.AlertRepository;
import com.manajero.manajeroadnonbackend.Entities.Alert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlertService {

  @Autowired
  private AlertRepository alertRepository;

  public List<Alert> getAllAlerts() {
    return alertRepository.findAll();
  }

  public Optional<Alert> getAlertById(String id) {
    return alertRepository.findById(id);
  }

  public Alert createAlert(Alert alert) {
    return alertRepository.save(alert);
  }

  public Alert updateAlert(String id, Alert alert) {
    alert.setId(id);
    return alertRepository.save(alert);
  }

  public void deleteAlert(String id) {
    alertRepository.deleteById(id);
  }
}
