package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Repositories.WhatifRepository;
import com.manajero.manajeroadnonbackend.Entities.Whatif;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class WhatIfService {

    @Autowired
    private WhatifRepository whatIfRepository;

    public List<Whatif> getAllWhatIfs() {
        return whatIfRepository.findAll();
    }

    public Optional<Whatif> getWhatIfById(String id) {
        return whatIfRepository.findById(id);
    }

    public Whatif createWhatIf(@Valid Whatif whatIf) {
        return whatIfRepository.save(whatIf);
    }

    public Whatif updateWhatIf(String id, Whatif whatIf) {
        whatIf.setId(id);
        return whatIfRepository.save(whatIf);
    }

    public void deleteWhatIf(String id) {
        whatIfRepository.deleteById(id);
    }
}
