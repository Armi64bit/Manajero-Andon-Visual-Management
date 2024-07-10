package com.manajero.manajeroadnonbackend.Controllers;

import com.manajero.manajeroadnonbackend.Services.WhatIfService;
import com.manajero.manajeroadnonbackend.Entities.Whatif;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/whatif")
public class WhatIfController {

    @Autowired
    private WhatIfService whatIfService;

    @GetMapping
    public List<Whatif> getAllWhatIfs() {
        return whatIfService.getAllWhatIfs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Whatif> getWhatIfById(@PathVariable String id) {
        Optional<Whatif> whatIf = whatIfService.getWhatIfById(id);
        if (whatIf.isPresent()) {
            return ResponseEntity.ok(whatIf.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createWhatIf(@Valid @RequestBody Whatif whatIf, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            return ResponseEntity.badRequest().body(errors);
        }

        Whatif createdWhatIf = whatIfService.createWhatIf(whatIf);
        return ResponseEntity.ok(createdWhatIf);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Whatif> updateWhatIf(@PathVariable String id, @RequestBody Whatif whatIf) {
        Whatif updatedWhatIf = whatIfService.updateWhatIf(id, whatIf);
        return ResponseEntity.ok(updatedWhatIf);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWhatIf(@PathVariable String id) {
        whatIfService.deleteWhatIf(id);
        return ResponseEntity.noContent().build();
    }
}
