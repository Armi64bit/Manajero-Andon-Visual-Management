package com.manajero.manajeroadnonbackend.Entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "station")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Station {
  @Id
  String id;
  String name;
  String metric_name;
  String target_value;
  String icon;
  String status;
  private String dashboardId;
}
