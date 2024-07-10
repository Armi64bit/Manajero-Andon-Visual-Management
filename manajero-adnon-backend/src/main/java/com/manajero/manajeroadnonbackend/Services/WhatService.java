package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Repositories.WhatRepository;
import com.manajero.manajeroadnonbackend.Entities.What;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WhatService {

    @Autowired
    private WhatRepository whatRepository;

    public List<What> getAllWhats() {
        return whatRepository.findAll();
    }

    public Optional<What> getWhatById(String id) {
        return whatRepository.findById(id);
    }

    public What createWhat(What what) {
        return whatRepository.save(what);
    }

    public What updateWhat(String id, What what) {
        what.setId(id);
        return whatRepository.save(what);
    }

    public void deleteWhat(String id) {
        whatRepository.deleteById(id);
    }
}
