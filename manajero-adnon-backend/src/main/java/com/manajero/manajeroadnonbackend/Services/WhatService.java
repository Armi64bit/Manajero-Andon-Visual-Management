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

  public What updateWhat(String id, What updatedWhat) {
    return whatRepository.findById(id).map(existingWhat -> {
      existingWhat.setTitle(updatedWhat.getTitle());
      existingWhat.setSubpoint1(updatedWhat.getSubpoint1());
      existingWhat.setContent1(updatedWhat.getContent1());
      existingWhat.setImage1(updatedWhat.getImage1());
      existingWhat.setSubpoint2(updatedWhat.getSubpoint2());
      existingWhat.setContent2(updatedWhat.getContent2());
      existingWhat.setImage2(updatedWhat.getImage2());
      existingWhat.setSubpoint3(updatedWhat.getSubpoint3());
      existingWhat.setContent3(updatedWhat.getContent3());
      existingWhat.setImage3(updatedWhat.getImage3());
      existingWhat.setSubpoint4(updatedWhat.getSubpoint4());
      existingWhat.setContent4(updatedWhat.getContent4());
      existingWhat.setImage4(updatedWhat.getImage4());
      return whatRepository.save(existingWhat);
    }).orElseThrow(() -> new RuntimeException("What not found with id " + id));
  }

    public void deleteWhat(String id) {
        whatRepository.deleteById(id);
    }
}
