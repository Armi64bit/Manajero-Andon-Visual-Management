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
    String step3;
    String step4;
    String step5;
    String step6;
    String step7;
    String step8;
    String step9;
    String step10;




}
