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
    // Initialize test data
    how = new How();
    how.setId("1");
    how.setStep1("Step 1");
    how.setStep1img("step1img.png");
    // Add other fields as needed
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
    // Create an initial How object with known values
    How existingHow = new How();
    existingHow.setId("1");
    existingHow.setStep1("Step 1");
    // Set other initial values as needed

    // Create an updated How object with new values
    How updatedHow = new How();
    updatedHow.setId("1");
    updatedHow.setStep1("Updated Step 1");
    // Set other updated values as needed

    // Mock repository to return existingHow when findById is called
    when(howRepository.findById(anyString())).thenReturn(Optional.of(existingHow));
    // Mock repository to return updatedHow when save is called
    when(howRepository.save(any(How.class))).thenReturn(updatedHow);

    // Call the method under test
    How result = howService.updateHow("1", updatedHow);

    // Verify that the result is as expected
    assertNotNull(result);
    assertEquals("1", result.getId());
    assertEquals("Updated Step 1", result.getStep1());
    // Add additional assertions for other fields
  }

  @Test
  void deleteHow() {
    doNothing().when(howRepository).deleteById(anyString());

    howService.deleteHow("1");
    verify(howRepository, times(1)).deleteById("1");
  }
}
