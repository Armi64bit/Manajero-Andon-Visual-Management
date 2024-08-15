package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Entities.Notification;
import com.manajero.manajeroadnonbackend.Services.KpiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/kpis")
public class KpiController {

  @Autowired
  private KpiService kpiService;

  @GetMapping("/dashboard/{id}")
  public Map<String, Object> getKpisForDashboard(@PathVariable String id) {
    return kpiService.calculateKpis(id);
  }
  @GetMapping("/all-dashboards")
  public Map<String, Object> getKpisForAllDashboards() {
    return kpiService.calculateKpisForAllDashboards();
  }
  @GetMapping("/notifications")
  public List<Notification> getNotifications() {
    return kpiService.getNotifications();
  }
}
