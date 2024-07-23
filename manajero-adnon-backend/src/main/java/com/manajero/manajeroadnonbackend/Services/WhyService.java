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


  public com.manajero.manajeroadnonbackend.Entities.Why updateWhy(String id, com.manajero.manajeroadnonbackend.Entities.Why updatedWhy) {
    Optional<com.manajero.manajeroadnonbackend.Entities.Why> existingWhyOptional = whyRepository.findById(id);
    if (existingWhyOptional.isPresent()) {
      com.manajero.manajeroadnonbackend.Entities.Why existingWhy = existingWhyOptional.get();
      existingWhy.setTitle(updatedWhy.getTitle());
      existingWhy.setSubpoint1(updatedWhy.getSubpoint1());
      existingWhy.setContent1(updatedWhy.getContent1());
      existingWhy.setImage1(updatedWhy.getImage1());
      existingWhy.setSubpoint2(updatedWhy.getSubpoint2());
      existingWhy.setContent2(updatedWhy.getContent2());
      existingWhy.setImage2(updatedWhy.getImage2());
      existingWhy.setSubpoint3(updatedWhy.getSubpoint3());
      existingWhy.setContent3(updatedWhy.getContent3());
      existingWhy.setImage3(updatedWhy.getImage3());
      existingWhy.setSubpoint4(updatedWhy.getSubpoint4());
      existingWhy.setContent4(updatedWhy.getContent4());
      existingWhy.setImage4(updatedWhy.getImage4());
      return whyRepository.save(existingWhy);
    }
    return null; // or throw an exception
  }
    public void deleteWhy(String id) {
        whyRepository.deleteById(id);
    }
}
