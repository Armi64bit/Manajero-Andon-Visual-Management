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
  public Dashboard addNotificationToDashboard(String dashboardId, Notification notification) {
    Dashboard dashboard = dashboardRepository.findById(dashboardId).orElse(null);
    if (dashboard == null) {
      return null; // or throw an exception
    }

    // Save the notification
    Notification savedNotification = notificationRepository.save(notification);

    // Add the notification to the dashboard
    List<Notification> notifications = dashboard.getNotifications();
    if (notifications == null) {
      notifications = new ArrayList<>();
    }
    notifications.add(savedNotification);
    dashboard.setNotifications(notifications);

    return dashboardRepository.save(dashboard);
  }

  public Dashboard createDashboard(Dashboard dashboard) {
    List<Alert> savedAlerts = handleAlerts(dashboard.getAlerts());
    dashboard.setAlerts(savedAlerts);

    List<Station> savedStations = handleStations(dashboard.getStations());
    dashboard.setStations(savedStations);

    List<Notification> savedNotifications = handleNotifications(dashboard.getNotifications());
    dashboard.setNotifications(savedNotifications);

    List<Threshold> savedThresholds = handleThresholds(dashboard.getThresholds());
    dashboard.setThresholds(savedThresholds);

    return dashboardRepository.save(dashboard);
  }

  public Dashboard updateDashboard(String id, Dashboard updatedDashboard) {
    Dashboard existingDashboard = dashboardRepository.findById(id).orElse(null);
    if (existingDashboard == null) {
      return null; // or throw an exception
    }

    existingDashboard.setName(updatedDashboard.getName());
    existingDashboard.setRefreshRate(updatedDashboard.getRefreshRate());

    List<Alert> savedAlerts = handleAlerts(updatedDashboard.getAlerts());
    existingDashboard.setAlerts(savedAlerts);

    List<Station> savedStations = handleStations(updatedDashboard.getStations());
    existingDashboard.setStations(savedStations);

    List<Notification> savedNotifications = handleNotifications(updatedDashboard.getNotifications());
    existingDashboard.setNotifications(savedNotifications);

    List<Threshold> savedThresholds = handleThresholds(updatedDashboard.getThresholds());
    existingDashboard.setThresholds(savedThresholds);

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
          alertToUpdate.setAlertType(alert.getAlertType());
          alertToUpdate.setStatus(alert.getStatus());
          savedAlerts.add(alertRepository.save(alertToUpdate));
        } else {
          savedAlerts.add(alertRepository.save(alert));
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
          stationToUpdate.setName(station.getName());
          stationToUpdate.setMetric_name(station.getMetric_name());
          stationToUpdate.setTarget_value(station.getTarget_value());
          stationToUpdate.setIcon(station.getIcon());
          savedStations.add(stationRepository.save(stationToUpdate));
        } else {
          savedStations.add(stationRepository.save(station));
        }
      }
    }
    return savedStations;
  }

  private List<Notification> handleNotifications(List<Notification> notifications) {
    List<Notification> savedNotifications = new ArrayList<>();
    for (Notification notification : notifications) {
      if (notification.getId() == null) {
        savedNotifications.add(notificationRepository.save(notification));
      } else {
        Optional<Notification> existingNotification = notificationRepository.findById(notification.getId());
        if (existingNotification.isPresent()) {
          Notification notificationToUpdate = existingNotification.get();
          notificationToUpdate.setType(notification.getType());
          notificationToUpdate.setMessage(notification.getMessage());
          notificationToUpdate.setTimestamp(notification.getTimestamp());
          notificationToUpdate.setDataSource(notification.getDataSource());
          savedNotifications.add(notificationRepository.save(notificationToUpdate));
        } else {
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
          thresholdToUpdate.setWarning(threshold.getWarning());
          thresholdToUpdate.setCritiacl(threshold.getCritiacl());
          savedThresholds.add(thresholdRepository.save(thresholdToUpdate));
        } else {
          savedThresholds.add(thresholdRepository.save(threshold));
        }
      }
    }
    return savedThresholds;
  }

  public void deleteDashboard(String id) {
    Dashboard dashboard = dashboardRepository.findById(id).orElse(null);
    if (dashboard != null) {
      deleteAlerts(dashboard.getAlerts());
      deleteStations(dashboard.getStations());
      deleteNotifications(dashboard.getNotifications());
      deleteThresholds(dashboard.getThresholds());
      dashboardRepository.deleteById(id);
    }
  }

  private void deleteAlerts(List<Alert> alerts) {
    for (Alert alert : alerts) {
      if (alert.getId() != null) {
        alertRepository.deleteById(alert.getId());
      }
    }
  }

  private void deleteStations(List<Station> stations) {
    for (Station station : stations) {
      if (station.getId() != null) {
        stationRepository.deleteById(station.getId());
      }
    }
  }

  private void deleteNotifications(List<Notification> notifications) {
    for (Notification notification : notifications) {
      if (notification.getId() != null) {
        notificationRepository.deleteById(notification.getId());
      }
    }
  }

  private void deleteThresholds(List<Threshold> thresholds) {
    for (Threshold threshold : thresholds) {
      if (threshold.getId() != null) {
        thresholdRepository.deleteById(threshold.getId());
      }
    }
  }

  public List<Station> getStationsByDashboardId(String dashboardId) {
    return stationRepository.findByDashboardId(dashboardId);
  }
}
