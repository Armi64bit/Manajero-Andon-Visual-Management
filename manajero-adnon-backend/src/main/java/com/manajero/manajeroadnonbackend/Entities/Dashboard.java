package com.manajero.manajeroadnonbackend.Entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "dashboard")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Dashboard {
  @Id
  String id;
  String name;
  int refreshRate;

  @DBRef
  List<Alert> alerts;

  @DBRef
  List<Notification> notifications;

  @DBRef
  List<Station> stations;

  @DBRef
  List<Threshold> thresholds;
}
