package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.Why;
import com.manajero.manajeroadnonbackend.Repositories.WhyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WhyServiceTest {

  @Mock
  private WhyRepository whyRepository;

  @InjectMocks
  private WhyService whyService;

  private Why why;

  @BeforeEach
  void setUp() {
    why = new Why();
    why.setId("1");
    why.setTitle("Sample Title");
    why.setSubpoint1("Sample Subpoint1");
    why.setContent1("Sample Content1");
    why.setImage1("Sample Image1");
    why.setSubpoint2("Sample Subpoint2");
    why.setContent2("Sample Content2");
    why.setImage2("Sample Image2");
    why.setSubpoint3("Sample Subpoint3");
    why.setContent3("Sample Content3");
    why.setImage3("Sample Image3");
    why.setSubpoint4("Sample Subpoint4");
    why.setContent4("Sample Content4");
    why.setImage4("Sample Image4");
  }

  @Test
  void getAllWhys() {
    List<Why> whyList = Arrays.asList(why);
    when(whyRepository.findAll()).thenReturn(whyList);

    List<Why> result = whyService.getAllWhys();

    assertEquals(1, result.size());
    verify(whyRepository, times(1)).findAll();
  }

  @Test
  void getWhyById() {
    when(whyRepository.findById(anyString())).thenReturn(Optional.of(why));

    Optional<Why> result = whyService.getWhyById("1");

    assertTrue(result.isPresent());
    assertEquals("1", result.get().getId());
    verify(whyRepository, times(1)).findById("1");
  }

  @Test
  void createWhy() {
    when(whyRepository.save(any(Why.class))).thenReturn(why);

    Why result = whyService.createWhy(why);

    assertNotNull(result);
    assertEquals("1", result.getId());
    verify(whyRepository, times(1)).save(why);
  }

  @Test
  void updateWhy() {
    // Mock the repository's findById and save methods
    when(whyRepository.findById(anyString())).thenReturn(Optional.of(why));
    when(whyRepository.save(any(Why.class))).thenReturn(why);

    // Create an updated Why object with new values
    Why updatedWhy = new Why();
    updatedWhy.setId("1");
    updatedWhy.setTitle("Updated Title");
    updatedWhy.setSubpoint1("Updated Subpoint1");
    updatedWhy.setContent1("Updated Content1");
    updatedWhy.setImage1("Updated Image1");
    updatedWhy.setSubpoint2("Updated Subpoint2");
    updatedWhy.setContent2("Updated Content2");
    updatedWhy.setImage2("Updated Image2");
    updatedWhy.setSubpoint3("Updated Subpoint3");
    updatedWhy.setContent3("Updated Content3");
    updatedWhy.setImage3("Updated Image3");
    updatedWhy.setSubpoint4("Updated Subpoint4");
    updatedWhy.setContent4("Updated Content4");
    updatedWhy.setImage4("Updated Image4");

    // Call the service method to update the Why object
    Why result = whyService.updateWhy("1", updatedWhy);

    // Verify the updates are reflected in the returned object
    assertNotNull(result);
    assertEquals("1", result.getId());
    assertEquals("Updated Title", result.getTitle());
    assertEquals("Updated Subpoint1", result.getSubpoint1());
    assertEquals("Updated Content1", result.getContent1());
    assertEquals("Updated Image1", result.getImage1());
    assertEquals("Updated Subpoint2", result.getSubpoint2());
    assertEquals("Updated Content2", result.getContent2());
    assertEquals("Updated Image2", result.getImage2());
    assertEquals("Updated Subpoint3", result.getSubpoint3());
    assertEquals("Updated Content3", result.getContent3());
    assertEquals("Updated Image3", result.getImage3());
    assertEquals("Updated Subpoint4", result.getSubpoint4());
    assertEquals("Updated Content4", result.getContent4());
    assertEquals("Updated Image4", result.getImage4());

    // Verify the save method was called
    verify(whyRepository, times(1)).save(any(Why.class));
  }


  @Test
  void deleteWhy() {
    doNothing().when(whyRepository).deleteById(anyString());

    whyService.deleteWhy("1");

    verify(whyRepository, times(1)).deleteById("1");
  }
}
