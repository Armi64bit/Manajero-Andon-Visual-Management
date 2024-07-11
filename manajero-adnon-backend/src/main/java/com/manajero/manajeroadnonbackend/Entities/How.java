package com.manajero.manajeroadnonbackend.Entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document(collection = "how")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class How {
    @Id
    String id;
    String step1;
    String step1img;

    String step2;
  String step2L;
  String step2B;


  String step3;
  String step3S;
  String step3img1;
  String step3L;
  String step3img2;
  String step3ID;
  String step3img3;


  String step4;
  String step4M;
  String step4img1;
  String step4A;
  String step4img2;

  String step5;
  String step5L;
  String step5img1;
  String step5B;
  String step5img2;

  String step6;
  String step6O;
  String step6img1;
  String step6R;
  String step6img2;


  String step7;
  String step7E;
  String step7R;
  String step7img1;
  String step7img2;

    String step8;
  String step8F;
  String step8M;
  String step8S;
  String step8T;
  String step8img1;
  String step8img2;
  String step8img3;


  String step9;
  String step9A;
  String step9T;
  String step9P;
  String step9C;
  String step9img1;
  String step9img2;
  String step9img3;
  String step9img4;


  String step10;
  String step10R;
  String step10K;
  String step10B;
  String step10D;
  String step10img1;
  String step10img2;
  String step10img3;
  String step10img4;






}
