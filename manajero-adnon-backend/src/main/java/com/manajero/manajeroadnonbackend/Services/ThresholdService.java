package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Repositories.ThresholdRepository;
import com.manajero.manajeroadnonbackend.Entities.Threshold;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThresholdService {

  @Autowired
  private ThresholdRepository thresholdRepository;

  public List<Threshold> getAllThresholds() {
    return thresholdRepository.findAll();
  }

  public Optional<Threshold> getThresholdById(String id) {
    return thresholdRepository.findById(id);
  }

  public Threshold createThreshold(Threshold threshold) {
    return thresholdRepository.save(threshold);
  }

  public Threshold updateThreshold(String id, Threshold threshold) {
    threshold.setId(id);
    return thresholdRepository.save(threshold);
  }

  public void deleteThreshold(String id) {
    thresholdRepository.deleteById(id);
  }
}
