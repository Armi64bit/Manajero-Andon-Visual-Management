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
    Optional<Whatif> existingWhatIf = whatIfRepository.findById(id);
    if (existingWhatIf.isPresent()) {
      Whatif updatedWhatIf = existingWhatIf.get();
      updatedWhatIf.setTitle(whatIf.getTitle());
      updatedWhatIf.setSubpoint1(whatIf.getSubpoint1());
      updatedWhatIf.setContent1(whatIf.getContent1());
      updatedWhatIf.setImage1(whatIf.getImage1());
      updatedWhatIf.setImage2(whatIf.getImage2());
      return whatIfRepository.save(updatedWhatIf);
    } else {
      throw new RuntimeException("Whatif not found with id " + id);
    }
  }


  public void deleteWhatIf(String id) {
        whatIfRepository.deleteById(id);
    }
}
