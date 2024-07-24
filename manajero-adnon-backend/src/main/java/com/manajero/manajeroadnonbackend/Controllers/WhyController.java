package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Services.WhyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/why")
public class WhyController {

    @Autowired
    private WhyService whyService;

    @GetMapping
    public List<com.manajero.manajeroadnonbackend.Entities.Why> getAllWhys() {
        return whyService.getAllWhys();
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.manajero.manajeroadnonbackend.Entities.Why> getWhyById(@PathVariable String id) {
        Optional<com.manajero.manajeroadnonbackend.Entities.Why> why = whyService.getWhyById(id);
        if (why.isPresent()) {
            return ResponseEntity.ok(why.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public com.manajero.manajeroadnonbackend.Entities.Why createWhy(@RequestBody com.manajero.manajeroadnonbackend.Entities.Why why) {
        return whyService.createWhy(why);
    }

    @PutMapping("/{id}")
    public ResponseEntity<com.manajero.manajeroadnonbackend.Entities.Why> updateWhy(@PathVariable String id, @RequestBody com.manajero.manajeroadnonbackend.Entities.Why why) {
        com.manajero.manajeroadnonbackend.Entities.Why updatedWhy = whyService.updateWhy(id, why);
        return ResponseEntity.ok(updatedWhy);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWhy(@PathVariable String id) {
        whyService.deleteWhy(id);
        return ResponseEntity.noContent().build();
    }
}
