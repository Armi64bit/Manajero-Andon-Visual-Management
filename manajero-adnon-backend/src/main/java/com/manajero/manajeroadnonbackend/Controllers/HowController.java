package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Services.HowService;
import com.manajero.manajeroadnonbackend.Entities.How;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/how")
public class HowController {

  @Autowired
  private HowService howService;

  @GetMapping
  public List<How> getAllHows() {
    return howService.getAllHows();
  }

  @GetMapping("/{id}")
  public ResponseEntity<How> getHowById(@PathVariable String id) {
    Optional<How> how = howService.getHowById(id);
      return how.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public How createHow(@RequestBody How how) {
    return howService.createHow(how);
  }

  @PutMapping("/{id}")
  public ResponseEntity<How> updateHow(@PathVariable String id, @RequestBody How how) {
    How updatedHow = howService.updateHow(id, how);
    return ResponseEntity.ok(updatedHow);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteHow(@PathVariable String id) {
    howService.deleteHow(id);
    return ResponseEntity.noContent().build();
  }
}
