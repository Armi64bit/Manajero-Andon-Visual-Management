package com.manajero.manajeroadnonbackend.Controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Replace with your Angular app's URL
public class FileUploadController {

  private static final String UPLOAD_DIR = "./uploads/";

  @PostMapping("/upload")
  public ResponseEntity<?> uploadFile(@RequestParam("upload") MultipartFile file) {
    try {
      // Create uploads directory if it doesn't exist
      if (!Files.exists(Paths.get(UPLOAD_DIR))) {
        Files.createDirectories(Paths.get(UPLOAD_DIR));
      }

      // Validate file type
      if (!file.getContentType().startsWith("image/")) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed.");
      }

      // Sanitize filename and create a unique identifier
      String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
      Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);

      // Save file to the uploads directory
      Files.write(filePath, file.getBytes());

      // Build URL for accessing uploaded file
      String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
        .path("/api/uploads/")
        .path(fileName)
        .toUriString();

      return ResponseEntity.ok().body("{ \"url\": \"" + fileDownloadUri + "\" }");

    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/uploads/{filename:.+}")
  public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
    try {
      Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
      Resource resource = new UrlResource(filePath.toUri());

      if (resource.exists() && resource.isReadable()) {
        return ResponseEntity.ok()
          .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(filePath)) // Automatically detect content type
          .body(resource);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
