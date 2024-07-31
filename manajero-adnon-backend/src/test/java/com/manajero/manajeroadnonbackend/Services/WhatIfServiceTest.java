package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.Whatif;
import com.manajero.manajeroadnonbackend.Repositories.WhatifRepository;
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
class WhatIfServiceTest {

  @Mock
  private WhatifRepository whatIfRepository;

  @InjectMocks
  private WhatIfService whatIfService;

  private Whatif whatIf;

  @BeforeEach
  void setUp() {
    whatIf = new Whatif();

    whatIf.setTitle("Sample Title");
    whatIf.setSubpoint1("Sample Subpoint1");
    whatIf.setContent1("Sample Content1");
    whatIf.setImage1("Sample Image1");
    whatIf.setImage2("Sample Image2");
  }

  @Test
  void getAllWhatIfs() {
    List<Whatif> whatIfList = Arrays.asList(whatIf);
    when(whatIfRepository.findAll()).thenReturn(whatIfList);

    List<Whatif> result = whatIfService.getAllWhatIfs();

    assertEquals(1, result.size());
    verify(whatIfRepository, times(1)).findAll();
  }

  @Test
  void getWhatIfById() {
    when(whatIfRepository.findById(anyString())).thenReturn(Optional.of(whatIf));

    Optional<Whatif> result = whatIfService.getWhatIfById("1");

    assertTrue(result.isPresent());
    assertEquals("1", result.get().getId());
    verify(whatIfRepository, times(1)).findById("1");
  }

  @Test
  void createWhatIf() {
    when(whatIfRepository.save(any(Whatif.class))).thenReturn(whatIf);

    Whatif result = whatIfService.createWhatIf(whatIf);

    assertNotNull(result);
    assertEquals("1", result.getId());
    verify(whatIfRepository, times(1)).save(whatIf);
  }

  @Test
  void updateWhatIf() {
    when(whatIfRepository.findById(anyString())).thenReturn(Optional.of(whatIf));
    when(whatIfRepository.save(any(Whatif.class))).thenReturn(whatIf);

    Whatif updatedWhatIf = new Whatif();
    updatedWhatIf.setId("1");
    updatedWhatIf.setTitle("Updated Title");
    updatedWhatIf.setSubpoint1("Updated Subpoint1");
    updatedWhatIf.setContent1("Updated Content1");
    updatedWhatIf.setImage1("Updated Image1");
    updatedWhatIf.setImage2("Updated Image2");

    Whatif result = whatIfService.updateWhatIf("1", updatedWhatIf);

    assertNotNull(result);
    assertEquals("1", result.getId());
    assertEquals("Updated Title", result.getTitle());
    assertEquals("Updated Subpoint1", result.getSubpoint1());
    assertEquals("Updated Content1", result.getContent1());
    assertEquals("Updated Image1", result.getImage1());
    assertEquals("Updated Image2", result.getImage2());
    verify(whatIfRepository, times(1)).save(any(Whatif.class));
  }

  @Test
  void deleteWhatIf() {
    doNothing().when(whatIfRepository).deleteById(anyString());

    whatIfService.deleteWhatIf("1");

    verify(whatIfRepository, times(1)).deleteById("1");
  }
}
