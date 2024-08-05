package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.*;
import com.manajero.manajeroadnonbackend.Repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

  @Mock
  private DashboardRepository dashboardRepository;

  @Mock
  private AlertRepository alertRepository;

  @Mock
  private StationRepository stationRepository;

  @Mock
  private NotificationRepository notificationRepository;

  @Mock
  private ThresholdRepository thresholdRepository;

  @InjectMocks
  private DashboardService dashboardService;

  private Dashboard dashboard;
  private Alert alert;
  private Station station;
  private Notification notification;
  private Threshold threshold;

  @BeforeEach
  void setUp() {
    alert = new Alert();
    alert.setId("alert1");

    station = new Station();
    station.setId("station1");

    notification = new Notification();
    notification.setId("notification1");

    threshold = new Threshold();
    threshold.setId("threshold1");

    dashboard = new Dashboard();
    dashboard.setId("dashboard1");
    dashboard.setName("Test Dashboard");
    dashboard.setRefreshRate(10);
    dashboard.setAlerts(Collections.singletonList(alert));
    dashboard.setStations(Collections.singletonList(station));
    dashboard.setNotifications(Collections.singletonList(notification));
    dashboard.setThresholds(Collections.singletonList(threshold));
  }

  @Test
  void getAllDashboards() {
    List<Dashboard> dashboards = Collections.singletonList(dashboard);
    when(dashboardRepository.findAll()).thenReturn(dashboards);

    List<Dashboard> result = dashboardService.getAllDashboards();

    assertEquals(1, result.size());
    assertEquals(dashboard, result.get(0));
    verify(dashboardRepository, times(1)).findAll();
  }

  @Test
  void getDashboardById() {
    when(dashboardRepository.findById(anyString())).thenReturn(Optional.of(dashboard));

    Dashboard result = dashboardService.getDashboardById("dashboard1");

    assertNotNull(result);
    assertEquals("dashboard1", result.getId());
    verify(dashboardRepository, times(1)).findById("dashboard1");
  }

  @Test
  void createDashboard() {
    when(dashboardRepository.save(any(Dashboard.class))).thenReturn(dashboard);
    when(alertRepository.save(any(Alert.class))).thenReturn(alert);
    when(stationRepository.save(any(Station.class))).thenReturn(station);
    when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
    when(thresholdRepository.save(any(Threshold.class))).thenReturn(threshold);

    Dashboard result = dashboardService.createDashboard(dashboard);

    assertNotNull(result);
    assertEquals("dashboard1", result.getId());
    verify(dashboardRepository, times(1)).save(dashboard);
    verify(alertRepository, times(1)).save(alert);
    verify(stationRepository, times(1)).save(station);
    verify(notificationRepository, times(1)).save(notification);
    verify(thresholdRepository, times(1)).save(threshold);
  }


  @Test
  void updateDashboard() {
    // Mock existing dashboard to return
    Dashboard existingDashboard = new Dashboard();
    existingDashboard.setId("dashboard1");
    existingDashboard.setName("Existing Dashboard");
    existingDashboard.setRefreshRate(10);
    existingDashboard.setAlerts(Collections.singletonList(alert));
    existingDashboard.setStations(Collections.singletonList(station));
    existingDashboard.setNotifications(Collections.singletonList(notification));
    existingDashboard.setThresholds(Collections.singletonList(threshold));

    // Mock repository calls
    when(dashboardRepository.findById(anyString())).thenReturn(Optional.of(existingDashboard));
    when(dashboardRepository.save(any(Dashboard.class))).thenReturn(existingDashboard);
    when(alertRepository.save(any(Alert.class))).thenReturn(alert);
    when(stationRepository.save(any(Station.class))).thenReturn(station);
    when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
    when(thresholdRepository.save(any(Threshold.class))).thenReturn(threshold);

    // Prepare updated dashboard
    Dashboard updatedDashboard = new Dashboard();
    updatedDashboard.setId("dashboard1");
    updatedDashboard.setName("Updated Dashboard");
    updatedDashboard.setRefreshRate(15);
    updatedDashboard.setAlerts(Collections.singletonList(alert)); // Ensure lists are initialized
    updatedDashboard.setStations(Collections.singletonList(station));
    updatedDashboard.setNotifications(Collections.singletonList(notification));
    updatedDashboard.setThresholds(Collections.singletonList(threshold));

    // Perform update
    Dashboard result = dashboardService.updateDashboard("dashboard1", updatedDashboard);

    // Verify results
    assertNotNull(result);
    assertEquals("dashboard1", result.getId());
    assertEquals("Updated Dashboard", result.getName());
    assertEquals(15, result.getRefreshRate());
    verify(dashboardRepository, times(1)).findById("dashboard1");
    verify(dashboardRepository, times(1)).save(result);
  }

  @Test
  void deleteDashboard() {
    when(dashboardRepository.findById(anyString())).thenReturn(Optional.of(dashboard));
    doNothing().when(alertRepository).deleteById(anyString());
    doNothing().when(stationRepository).deleteById(anyString());
    doNothing().when(notificationRepository).deleteById(anyString());
    doNothing().when(thresholdRepository).deleteById(anyString());

    dashboardService.deleteDashboard("dashboard1");

    verify(dashboardRepository, times(1)).findById("dashboard1");
    verify(dashboardRepository, times(1)).deleteById("dashboard1");
    verify(alertRepository, times(1)).deleteById("alert1");
    verify(stationRepository, times(1)).deleteById("station1");
    verify(notificationRepository, times(1)).deleteById("notification1");
    verify(thresholdRepository, times(1)).deleteById("threshold1");
  }

  @Test
  void getStationsByDashboardId() {
    List<Station> stations = Collections.singletonList(station);
    when(stationRepository.findByDashboardId(anyString())).thenReturn(stations);

    List<Station> result = dashboardService.getStationsByDashboardId("dashboard1");

    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals(station, result.get(0));
    verify(stationRepository, times(1)).findByDashboardId("dashboard1");
  }
}
