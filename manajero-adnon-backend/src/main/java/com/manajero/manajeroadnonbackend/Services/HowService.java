package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Repositories.HowRepository;
import com.manajero.manajeroadnonbackend.Entities.How;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HowService {

  @Autowired
  private HowRepository howRepository;

  public List<How> getAllHows() {
    return howRepository.findAll();
  }

  public Optional<How> getHowById(String id) {
    return howRepository.findById(id);
  }

  public How createHow(How how) {
    return howRepository.save(how);
  }

  public How updateHow(String id, How how) {
    how.setId(id);
    return howRepository.save(how);
  }


  public void deleteHow(String id) {
    howRepository.deleteById(id);
  }
}
