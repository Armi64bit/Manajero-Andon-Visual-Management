package com.manajero.manajeroadnonbackend.Entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.*;

@Document(collection = "what")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class What {
    @Id
    String id;

    @NotBlank(message = "Title is required")
    String title;

    @NotBlank(message = "Subpoint 1 cannot be blank")
    String subpoint1;

    @NotBlank(message = "Content 1 cannot be blank")
    String content1;

    String image1;

    @NotBlank(message = "Subpoint 2 cannot be blank")
    String subpoint2;

    @NotBlank(message = "Content 2 cannot be blank")
    String content2;

    String image2;

    @NotBlank(message = "Subpoint 3 cannot be blank")
    String subpoint3;

    @NotBlank(message = "Content 3 cannot be blank")
    String content3;

    String image3;

    @NotBlank(message = "Subpoint 4 cannot be blank")
    String subpoint4;

    @NotBlank(message = "Content 4 cannot be blank")
    String content4;

    String image4;
}
