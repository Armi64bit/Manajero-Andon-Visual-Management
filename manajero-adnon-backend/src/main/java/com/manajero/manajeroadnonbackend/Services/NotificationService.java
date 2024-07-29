package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Repositories.NotificationRepository;
import com.manajero.manajeroadnonbackend.Entities.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

  @Autowired
  private NotificationRepository notificationRepository;

  public List<Notification> getAllNotifications() {
    return notificationRepository.findAll();
  }

  public Optional<Notification> getNotificationById(String id) {
    return notificationRepository.findById(id);
  }

  public Notification createNotification(Notification notification) {
    return notificationRepository.save(notification);
  }

  public Notification updateNotification(String id, Notification notification) {
    notification.setId(id);
    return notificationRepository.save(notification);
  }

  public void deleteNotification(String id) {
    notificationRepository.deleteById(id);
  }
}
