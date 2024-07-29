package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Entities.Notification;
import com.manajero.manajeroadnonbackend.Services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  @GetMapping
  public List<Notification> getAllNotifications() {
    return notificationService.getAllNotifications();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Notification> getNotificationById(@PathVariable String id) {
    Optional<Notification> notification = notificationService.getNotificationById(id);
    if (notification.isPresent()) {
      return ResponseEntity.ok(notification.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public Notification createNotification(@RequestBody Notification notification) {
    return notificationService.createNotification(notification);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Notification> updateNotification(@PathVariable String id, @RequestBody Notification notification) {
    if (notificationService.getNotificationById(id).isPresent()) {
      Notification updatedNotification = notificationService.updateNotification(id, notification);
      return ResponseEntity.ok(updatedNotification);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteNotification(@PathVariable String id) {
    if (notificationService.getNotificationById(id).isPresent()) {
      notificationService.deleteNotification(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
