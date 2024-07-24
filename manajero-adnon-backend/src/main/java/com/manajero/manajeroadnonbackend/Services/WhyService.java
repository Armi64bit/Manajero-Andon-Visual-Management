package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Repositories.WhyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WhyService {

    @Autowired
    private WhyRepository whyRepository;

    public List<com.manajero.manajeroadnonbackend.Entities.Why> getAllWhys() {
        return whyRepository.findAll();
    }

    public Optional<com.manajero.manajeroadnonbackend.Entities.Why> getWhyById(String id) {
        return whyRepository.findById(id);
    }

    public com.manajero.manajeroadnonbackend.Entities.Why createWhy(com.manajero.manajeroadnonbackend.Entities.Why why) {
        return whyRepository.save(why);
    }

    public com.manajero.manajeroadnonbackend.Entities.Why updateWhy(String id, com.manajero.manajeroadnonbackend.Entities.Why why) {
        why.setId(id);
        return whyRepository.save(why);
    }

    public void deleteWhy(String id) {
        whyRepository.deleteById(id);
    }
}
