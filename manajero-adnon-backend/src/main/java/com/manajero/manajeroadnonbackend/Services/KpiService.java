package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.Alert; // Import your Alert entity
import com.manajero.manajeroadnonbackend.Entities.Dashboard;
import com.manajero.manajeroadnonbackend.Entities.Notification;
import com.manajero.manajeroadnonbackend.Entities.Station;
import com.manajero.manajeroadnonbackend.Repositories.DashboardRepository;
import com.manajero.manajeroadnonbackend.Repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class KpiService {

  @Autowired
  private DashboardRepository dashboardRepository;
  @Autowired
  private NotificationRepository notificationRepository;

  public Map<String, Object> calculateKpis(String dashboardId) {
    Optional<Dashboard> dashboardOpt = dashboardRepository.findById(dashboardId);

    if (dashboardOpt.isPresent()) {
      Dashboard dashboard = dashboardOpt.get();

      return calculateKpisForDashboard(dashboard);
    } else {
      throw new RuntimeException("Dashboard not found with id " + dashboardId);
    }
  }
  public List<Notification> getNotifications() {
    return notificationRepository.findAll();
  }
  public Map<String, Object> calculateKpisForAllDashboards() {
    List<Dashboard> dashboards = dashboardRepository.findAll();
    Map<String, Object> aggregateKpis = new HashMap<>();

    double totalUptime = 0;
    double totalDowntime = 0;
    int totalNotifications = 0;
    int criticalNotifications = 0;
    int warningNotifications = 0;
    int resolvedNotifications = 0;
    int totalStations = 0;
    int criticalStations = 0;
    int warningStations = 0;
    int totalAlerts = 0;
    int inProgressAlerts = 0;

    for (Dashboard dashboard : dashboards) {
      Map<String, Object> kpis = calculateKpisForDashboard(dashboard);
      totalUptime += (double) kpis.get("uptimePercentage");
      totalDowntime += (double) kpis.get("downtimePercentage");
      totalNotifications += (int) kpis.get("totalNotifications");
      criticalNotifications += (int) kpis.get("criticalNotifications");
      warningNotifications += (int) kpis.get("warningNotifications");
      resolvedNotifications += (int) kpis.get("resolvedNotifications");
      totalStations += (int) kpis.get("totalStations");
      criticalStations += (int) kpis.get("criticalStations");
      warningStations += (int) kpis.get("warningStations");
      totalAlerts += (int) kpis.get("totalAlerts");
      inProgressAlerts += (int) kpis.get("inProgressAlerts");
    }

    int dashboardCount = dashboards.size();
    aggregateKpis.put("averageUptimePercentage", totalUptime / dashboardCount);
    aggregateKpis.put("averageDowntimePercentage", totalDowntime / dashboardCount);
    aggregateKpis.put("totalNotifications", totalNotifications);
    aggregateKpis.put("totalCriticalNotifications", criticalNotifications);
    aggregateKpis.put("totalWarningNotifications", warningNotifications);
    aggregateKpis.put("totalResolvedNotifications", resolvedNotifications);
    aggregateKpis.put("totalStations", totalStations);
    aggregateKpis.put("totalCriticalStations", criticalStations);
    aggregateKpis.put("totalWarningStations", warningStations);
    aggregateKpis.put("totalAlerts", totalAlerts);
    aggregateKpis.put("totalInProgressAlerts", inProgressAlerts);

    return aggregateKpis;
  }

  private Map<String, Object> calculateKpisForDashboard(Dashboard dashboard) {
    double uptimePercentage = calculateUptime(dashboard.getStations());
    double downtimePercentage = 100 - uptimePercentage;
    int totalNotifications = calculateTotalNotifications(dashboard.getNotifications());
    int criticalNotifications = calculateCriticalNotifications(dashboard.getNotifications());
    int warningNotifications = calculateWarningNotifications(dashboard.getNotifications());
    int resolvedNotifications = calculateResolvedNotifications(dashboard.getNotifications());

    int totalStations = calculateTotalStations(dashboard.getStations());
    int criticalStations = calculateCriticalStations(dashboard.getStations());
    int warningStations = calculateWarningStations(dashboard.getStations());

    int totalAlerts = calculateTotalAlerts(dashboard.getAlerts());
    int inProgressAlerts = calculateInProgressAlerts(dashboard.getAlerts());

    Map<String, Object> kpis = new HashMap<>();
    kpis.put("uptimePercentage", uptimePercentage);
    kpis.put("downtimePercentage", downtimePercentage);
    kpis.put("totalNotifications", totalNotifications);
    kpis.put("criticalNotifications", criticalNotifications);
    kpis.put("warningNotifications", warningNotifications);
    kpis.put("resolvedNotifications", resolvedNotifications);
    kpis.put("totalStations", totalStations);
    kpis.put("criticalStations", criticalStations);
    kpis.put("warningStations", warningStations);
    kpis.put("totalAlerts", totalAlerts);
    kpis.put("inProgressAlerts", inProgressAlerts);

    return kpis;
  }

  private double calculateUptime(List<Station> stations) {
    long operationalStations = stations.stream()
      .filter(station -> "normal".equalsIgnoreCase(station.getStatus()))
      .count();
    return (double) operationalStations / stations.size() * 100;
  }

  private int calculateTotalNotifications(List<Notification> notifications) {
    return notifications.size();
  }

  private int calculateCriticalNotifications(List<Notification> notifications) {
    return (int) notifications.stream()
      .filter(notification -> "critical".equalsIgnoreCase(notification.getLevel()))
      .count();
  }

  private int calculateWarningNotifications(List<Notification> notifications) {
    return (int) notifications.stream()
      .filter(notification -> "warning".equalsIgnoreCase(notification.getLevel()))
      .count();
  }

  private int calculateResolvedNotifications(List<Notification> notifications) {
    return (int) notifications.stream()
      .filter(notification -> "resolved".equalsIgnoreCase(notification.getStatus()))
      .count();
  }

  private int calculateTotalStations(List<Station> stations) {
    return stations.size();
  }

  private int calculateCriticalStations(List<Station> stations) {
    return (int) stations.stream()
      .filter(station -> "critical".equalsIgnoreCase(station.getStatus()))
      .count();
  }

  private int calculateWarningStations(List<Station> stations) {
    return (int) stations.stream()
      .filter(station -> "warning".equalsIgnoreCase(station.getStatus()))
      .count();
  }

  private int calculateTotalAlerts(List<Alert> alerts) {
    return alerts.size();
  }

  private int calculateInProgressAlerts(List<Alert> alerts) {
    return (int) alerts.stream()
      .filter(alert -> "in-progress".equalsIgnoreCase(alert.getStatus()))
      .count();
  }
}
