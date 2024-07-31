package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.*;
import com.manajero.manajeroadnonbackend.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DashboardService {
  @Autowired
  private DashboardRepository dashboardRepository;
  @Autowired
  private AlertRepository alertRepository;
  @Autowired
  private StationRepository stationRepository;
  @Autowired
  private NotificationRepository notificationRepository;
  @Autowired
  private ThresholdRepository thresholdRepository;

  public List<Dashboard> getAllDashboards() {
    return dashboardRepository.findAll();
  }

  public Dashboard getDashboardById(String id) {
    return dashboardRepository.findById(id).orElse(null);
  }

  public Dashboard createDashboard(Dashboard dashboard) {
    // Handle alerts
    List<Alert> savedAlerts = handleAlerts(dashboard.getAlerts());
    dashboard.setAlerts(savedAlerts);

    // Handle stations
    List<Station> savedStations = handleStations(dashboard.getStations());
    dashboard.setStations(savedStations);

    // Handle notifications
    List<Notification> savedNotifications = handleNotifications(dashboard.getNotifications());
    dashboard.setNotifications(savedNotifications);

    // Handle thresholds
    List<Threshold> savedThresholds = handleThresholds(dashboard.getThresholds());
    dashboard.setThresholds(savedThresholds);

    // Save the dashboard
    return dashboardRepository.save(dashboard);
  }

  public Dashboard updateDashboard(String id, Dashboard updatedDashboard) {
    Dashboard existingDashboard = dashboardRepository.findById(id).orElse(null);
    if (existingDashboard == null) {
      return null; // or throw an exception
    }

    // Update fields
    existingDashboard.setName(updatedDashboard.getName());
    existingDashboard.setRefreshRate(updatedDashboard.getRefreshRate());

    // Handle alerts
    List<Alert> savedAlerts = handleAlerts(updatedDashboard.getAlerts());
    existingDashboard.setAlerts(savedAlerts);

    // Handle stations
    List<Station> savedStations = handleStations(updatedDashboard.getStations());
    existingDashboard.setStations(savedStations);

    // Handle notifications
    List<Notification> savedNotifications = handleNotifications(updatedDashboard.getNotifications());
    existingDashboard.setNotifications(savedNotifications);

    // Handle thresholds
    List<Threshold> savedThresholds = handleThresholds(updatedDashboard.getThresholds());
    existingDashboard.setThresholds(savedThresholds);

    // Save the updated dashboard
    return dashboardRepository.save(existingDashboard);
  }

  private List<Alert> handleAlerts(List<Alert> alerts) {
    List<Alert> savedAlerts = new ArrayList<>();
    for (Alert alert : alerts) {
      if (alert.getId() == null) {
        savedAlerts.add(alertRepository.save(alert));
      } else {
        Optional<Alert> existingAlert = alertRepository.findById(alert.getId());
        if (existingAlert.isPresent()) {
          Alert alertToUpdate = existingAlert.get();
          // Update fields as necessary
          alertToUpdate.setAlertType(alert.getAlertType());
          alertToUpdate.setStatus(alert.getStatus());
          alertRepository.save(alertToUpdate);
          savedAlerts.add(alertToUpdate);
        }
      }
    }
    return savedAlerts;
  }

  private List<Station> handleStations(List<Station> stations) {
    List<Station> savedStations = new ArrayList<>();
    for (Station station : stations) {
      if (station.getId() == null) {
        savedStations.add(stationRepository.save(station));
      } else {
        Optional<Station> existingStation = stationRepository.findById(station.getId());
        if (existingStation.isPresent()) {
          Station stationToUpdate = existingStation.get();
          // Update fields as necessary
          stationToUpdate.setName(station.getName());
          stationToUpdate.setMetric_name(station.getMetric_name());
          stationToUpdate.setTarget_value(station.getTarget_value());
          stationToUpdate.setIcon(station.getIcon());
          stationRepository.save(stationToUpdate);
          savedStations.add(stationToUpdate);
        }
      }
    }
    return savedStations;
  }

  private List<Notification> handleNotifications(List<Notification> notifications) {
    List<Notification> savedNotifications = new ArrayList<>();
    for (Notification notification : notifications) {
      if (notification.getId() == null) {
        // If ID is null, save as new
        savedNotifications.add(notificationRepository.save(notification));
      } else {
        // Otherwise, update the existing notification
        Optional<Notification> existingNotification = notificationRepository.findById(notification.getId());
        if (existingNotification.isPresent()) {
          Notification notificationToUpdate = existingNotification.get();
          notificationToUpdate.setType(notification.getType());
          notificationToUpdate.setMessage(notification.getMessage());
          notificationToUpdate.setTimestamp(notification.getTimestamp());
          notificationToUpdate.setDataSource(notification.getDataSource());
          savedNotifications.add(notificationRepository.save(notificationToUpdate));
        } else {
          // If the notification does not exist, save it as new
          savedNotifications.add(notificationRepository.save(notification));
        }
      }
    }
    return savedNotifications;
  }

  private List<Threshold> handleThresholds(List<Threshold> thresholds) {
    List<Threshold> savedThresholds = new ArrayList<>();
    for (Threshold threshold : thresholds) {
      if (threshold.getId() == null) {
        savedThresholds.add(thresholdRepository.save(threshold));
      } else {
        Optional<Threshold> existingThreshold = thresholdRepository.findById(threshold.getId());
        if (existingThreshold.isPresent()) {
          Threshold thresholdToUpdate = existingThreshold.get();
          // Update fields as necessary
          thresholdToUpdate.setWarning(threshold.getWarning());
          thresholdToUpdate.setCritiacl(threshold.getCritiacl());
          thresholdRepository.save(thresholdToUpdate);
          savedThresholds.add(thresholdToUpdate);
        }
      }
    }
    return savedThresholds;
  }

  public void deleteDashboard(String id) {
    dashboardRepository.deleteById(id);
  }
}
