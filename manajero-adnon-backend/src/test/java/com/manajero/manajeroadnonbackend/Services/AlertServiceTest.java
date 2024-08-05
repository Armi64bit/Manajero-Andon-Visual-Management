package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.Alert;
import com.manajero.manajeroadnonbackend.Repositories.AlertRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AlertServiceTest {

  @Mock
  private AlertRepository alertRepository;

  @InjectMocks
  private AlertService alertService;

  private Alert alert1;
  private Alert alert2;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    alert1 = new Alert("1", "station1", "type1", LocalDateTime.now(), "status1");
    alert2 = new Alert("2", "station2", "type2", LocalDateTime.now(), "status2");
  }

  @Test
  void getAllAlerts() {
    List<Alert> alerts = Arrays.asList(alert1, alert2);
    when(alertRepository.findAll()).thenReturn(alerts);

    List<Alert> result = alertService.getAllAlerts();

    assertEquals(2, result.size());
    assertEquals(alert1, result.get(0));
    assertEquals(alert2, result.get(1));
    verify(alertRepository, times(1)).findAll();
  }

  @Test
  void getAlertById() {
    when(alertRepository.findById(anyString())).thenReturn(Optional.of(alert1));

    Optional<Alert> result = alertService.getAlertById("1");

    assertTrue(result.isPresent());
    assertEquals(alert1, result.get());
    verify(alertRepository, times(1)).findById("1");
  }

  @Test
  void createAlert() {
    when(alertRepository.save(any(Alert.class))).thenReturn(alert1);

    Alert result = alertService.createAlert(alert1);

    assertEquals(alert1, result);
    verify(alertRepository, times(1)).save(alert1);
  }

  @Test
  void updateAlert() {
    when(alertRepository.save(any(Alert.class))).thenReturn(alert1);

    Alert result = alertService.updateAlert("1", alert1);

    assertEquals(alert1, result);
    verify(alertRepository, times(1)).save(alert1);
  }

  @Test
  void deleteAlert() {
    doNothing().when(alertRepository).deleteById(anyString());

    alertService.deleteAlert("1");

    verify(alertRepository, times(1)).deleteById("1");
  }
}
