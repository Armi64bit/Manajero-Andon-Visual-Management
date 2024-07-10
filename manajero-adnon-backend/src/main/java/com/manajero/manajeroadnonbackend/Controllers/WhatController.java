package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Services.WhatService;
import com.manajero.manajeroadnonbackend.Entities.What;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/what")
public class WhatController {

    @Autowired
    private WhatService whatService;

    @GetMapping
    public List<What> getAllWhats() {
        return whatService.getAllWhats();
    }

    @GetMapping("/{id}")
    public ResponseEntity<What> getWhatById(@PathVariable String id) {
        Optional<What> what = whatService.getWhatById(id);
        if (what.isPresent()) {
            return ResponseEntity.ok(what.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public What createWhat(@RequestBody What what) {
        return whatService.createWhat(what);
    }

    @PutMapping("/{id}")
    public ResponseEntity<What> updateWhat(@PathVariable String id, @RequestBody What what) {
        What updatedWhat = whatService.updateWhat(id, what);
        return ResponseEntity.ok(updatedWhat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWhat(@PathVariable String id) {
        whatService.deleteWhat(id);
        return ResponseEntity.noContent().build();
    }
}
