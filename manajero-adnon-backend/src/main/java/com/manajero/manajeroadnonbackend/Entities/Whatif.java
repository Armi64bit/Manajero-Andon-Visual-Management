package com.manajero.manajeroadnonbackend.Entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Document(collection = "whatif")
@Getter
@Setter
@AllArgsConstructor

@FieldDefaults(level = AccessLevel.PRIVATE)
public class Whatif {
    @Id
    String id;

    @NotBlank(message = "Title is required")
    String title;

    @NotBlank(message = "Subpoint 1 is required")
    String subpoint1;

    @NotBlank(message = "Content 1 is required")
    String content1;

    //@Size(max = 255, message = "Image 1 should be less than or equal to 255 characters")
    String image1;

    String image2;


}
