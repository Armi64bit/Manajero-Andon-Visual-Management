package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.How;
import com.manajero.manajeroadnonbackend.Repositories.HowRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class HowServiceTest {

  @Mock
  private HowRepository howRepository;

  @InjectMocks
  private HowService howService;

  private How how;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    how = new How();
    how.setId("1");
    how.setStep1("Step 1");
    how.setStep1img("step1img.png");
  }

  @Test
  void getAllHows() {
    List<How> hows = Collections.singletonList(how);
    when(howRepository.findAll()).thenReturn(hows);

    List<How> result = howService.getAllHows();
    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals(how, result.get(0));
  }

  @Test
  void getHowById() {
    when(howRepository.findById(anyString())).thenReturn(Optional.of(how));

    Optional<How> result = howService.getHowById("1");
    assertTrue(result.isPresent());
    assertEquals(how, result.get());
  }

  @Test
  void createHow() {
    when(howRepository.save(any(How.class))).thenReturn(how);

    How result = howService.createHow(how);
    assertNotNull(result);
    assertEquals(how, result);
  }

  @Test
  void updateHow() {
    How existingHow = new How();
    existingHow.setId("1");
    existingHow.setStep1("Step 1");

    How updatedHow = new How();
    updatedHow.setId("1");
    updatedHow.setStep1("Updated Step 1");

    when(howRepository.findById(anyString())).thenReturn(Optional.of(existingHow));
    when(howRepository.save(any(How.class))).thenReturn(updatedHow);

    How result = howService.updateHow("1", updatedHow);

    assertNotNull(result);
    assertEquals("1", result.getId());
    assertEquals("Updated Step 1", result.getStep1());
  }

  @Test
  void deleteHow() {
    doNothing().when(howRepository).deleteById(anyString());

    howService.deleteHow("1");
    verify(howRepository, times(1)).deleteById("1");
  }
}
