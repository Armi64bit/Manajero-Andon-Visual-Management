package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.Station;
import com.manajero.manajeroadnonbackend.Repositories.StationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StationServiceTest {

  @Mock
  private StationRepository stationRepository;

  @InjectMocks
  private StationService stationService;

  private Station station;

  @BeforeEach
  void setUp() {
    station = new Station();
    station.setId("id1");
    station.setName("Station 1");
    station.setMetric_name("Metric 1");
    station.setTarget_value("100");
    station.setIcon("icon1.png");
    station.setStatus("Active");
    station.setDashboardId("dashboard1");
  }

  @Test
  void getAllStations() {
    List<Station> stations = Arrays.asList(station);
    when(stationRepository.findAll()).thenReturn(stations);

    List<Station> result = stationService.getAllStations();

    assertEquals(1, result.size());
    verify(stationRepository, times(1)).findAll();
  }

  @Test
  void getStationById() {
    when(stationRepository.findById(anyString())).thenReturn(Optional.of(station));

    Optional<Station> result = stationService.getStationById("id1");

    assertTrue(result.isPresent());
    assertEquals("id1", result.get().getId());
    verify(stationRepository, times(1)).findById("id1");
  }

  @Test
  void createStation() {
    when(stationRepository.save(any(Station.class))).thenReturn(station);

    Station result = stationService.createStation(station);

    assertNotNull(result);
    assertEquals("id1", result.getId());
    verify(stationRepository, times(1)).save(station);
  }

  @Test
  void updateStation() {
    // Ensure the findById method is called by using it in the service method
    when(stationRepository.findById("id1")).thenReturn(Optional.of(station));
    when(stationRepository.save(any(Station.class))).thenAnswer(invocation -> invocation.getArgument(0));

    Station updatedStation = new Station();
    updatedStation.setId("id1");
    updatedStation.setName("Updated Station");
    updatedStation.setMetric_name("Updated Metric");
    updatedStation.setTarget_value("200");
    updatedStation.setIcon("icon2.png");
    updatedStation.setStatus("Inactive");
    updatedStation.setDashboardId("dashboard2");

    Station result = stationService.updateStation("id1", updatedStation);

    assertNotNull(result);
    assertEquals("id1", result.getId());
    assertEquals("Updated Station", result.getName());
    assertEquals("Updated Metric", result.getMetric_name());
    assertEquals("200", result.getTarget_value());
    assertEquals("icon2.png", result.getIcon());
    assertEquals("Inactive", result.getStatus());
    assertEquals("dashboard2", result.getDashboardId());
    verify(stationRepository, times(1)).findById("id1");
    verify(stationRepository, times(1)).save(any(Station.class));
  }

  @Test
  void deleteStation() {
    doNothing().when(stationRepository).deleteById(anyString());

    stationService.deleteStation("id1");

    verify(stationRepository, times(1)).deleteById("id1");
  }
}
