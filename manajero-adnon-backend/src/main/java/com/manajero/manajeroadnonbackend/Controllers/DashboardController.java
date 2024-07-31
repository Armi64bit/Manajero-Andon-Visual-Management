package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Entities.Dashboard;
import com.manajero.manajeroadnonbackend.Services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboards")
public class DashboardController {

  @Autowired
  private DashboardService dashboardService;

  @GetMapping
  public List<Dashboard> getAllDashboards() {
    return dashboardService.getAllDashboards();
  }

  @GetMapping("/{id}")
  public Dashboard getDashboard(@PathVariable String id) {
    return dashboardService.getDashboardById(id);
  }

  @PostMapping
  public ResponseEntity<Dashboard> createDashboard(@RequestBody Dashboard dashboard) {
    Dashboard createdDashboard = dashboardService.createDashboard(dashboard);
    if (createdDashboard != null) {
      return ResponseEntity.ok(createdDashboard);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Dashboard> updateDashboard(@PathVariable String id, @RequestBody Dashboard updatedDashboard) {
    Dashboard dashboard = dashboardService.updateDashboard(id, updatedDashboard);
    if (dashboard != null) {
      return ResponseEntity.ok(dashboard);
    } else {
      return ResponseEntity.notFound().build();
    }
  }
  @DeleteMapping("/{id}")
  public void deleteDashboard(@PathVariable String id) {
    dashboardService.deleteDashboard(id);
  }
}
