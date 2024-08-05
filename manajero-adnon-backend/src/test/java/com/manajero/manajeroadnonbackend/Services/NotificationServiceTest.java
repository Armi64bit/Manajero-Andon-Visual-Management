package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.Notification;
import com.manajero.manajeroadnonbackend.Repositories.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

  @Mock
  private NotificationRepository notificationRepository;

  @InjectMocks
  private NotificationService notificationService;

  private Notification notification;

  @BeforeEach
  void setUp() {
    notification = new Notification();
    notification.setId("id1");
    notification.setStation("station1");
    notification.setMessage("Sample message");
    notification.setLevel("High");
    notification.setStatus("Active");
    notification.setTimestamp(LocalDateTime.now());
    notification.setNote("Sample note");
    notification.setType("Type1");
    notification.setDataSource("DataSource1");
  }

  @Test
  void getAllNotifications() {
    List<Notification> notifications = Arrays.asList(notification);
    when(notificationRepository.findAll()).thenReturn(notifications);

    List<Notification> result = notificationService.getAllNotifications();

    assertEquals(1, result.size());
    verify(notificationRepository, times(1)).findAll();
  }

  @Test
  void getNotificationById() {
    when(notificationRepository.findById(anyString())).thenReturn(Optional.of(notification));

    Optional<Notification> result = notificationService.getNotificationById("id1");

    assertTrue(result.isPresent());
    assertEquals("id1", result.get().getId());
    verify(notificationRepository, times(1)).findById("id1");
  }

  @Test
  void createNotification() {
    when(notificationRepository.save(any(Notification.class))).thenReturn(notification);

    Notification result = notificationService.createNotification(notification);

    assertNotNull(result);
    assertEquals("id1", result.getId());
    verify(notificationRepository, times(1)).save(notification);
  }

  @Test
  void updateNotification() {
    // Ensure the findById method is called by using it in the service method
    when(notificationRepository.findById("id1")).thenReturn(Optional.of(notification));
    when(notificationRepository.save(any(Notification.class))).thenAnswer(invocation -> invocation.getArgument(0));

    Notification updatedNotification = new Notification();
    updatedNotification.setId("id1");
    updatedNotification.setStation("station2");
    updatedNotification.setMessage("Updated message");
    updatedNotification.setLevel("Medium");
    updatedNotification.setStatus("Inactive");
    updatedNotification.setTimestamp(LocalDateTime.now());
    updatedNotification.setNote("Updated note");
    updatedNotification.setType("Type2");
    updatedNotification.setDataSource("DataSource2");

    Notification result = notificationService.updateNotification("id1", updatedNotification);

    assertNotNull(result);
    assertEquals("id1", result.getId());
    assertEquals("station2", result.getStation());
    assertEquals("Updated message", result.getMessage());
    assertEquals("Medium", result.getLevel());
    assertEquals("Inactive", result.getStatus());
    assertEquals("Updated note", result.getNote());
    assertEquals("Type2", result.getType());
    assertEquals("DataSource2", result.getDataSource());
    verify(notificationRepository, times(1)).findById("id1");
    verify(notificationRepository, times(1)).save(any(Notification.class));
  }

  @Test
  void deleteNotification() {
    doNothing().when(notificationRepository).deleteById(anyString());

    notificationService.deleteNotification("id1");

    verify(notificationRepository, times(1)).deleteById("id1");
  }
}
