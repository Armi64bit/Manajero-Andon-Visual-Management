package com.manajero.manajeroadnonbackend.Services;

import com.manajero.manajeroadnonbackend.Entities.What;
import com.manajero.manajeroadnonbackend.Repositories.WhatRepository;
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
class WhatServiceTest {

  @Mock
  private WhatRepository whatRepository;

  @InjectMocks
  private WhatService whatService;

  private What what;

  @BeforeEach
  void setUp() {
    what = new What();
    what.setId("1");
    what.setTitle("Sample Title");
    what.setSubpoint1("Sample Subpoint1");
    what.setContent1("Sample Content1");
    what.setImage1("Sample Image1");
    what.setSubpoint2("Sample Subpoint2");
    what.setContent2("Sample Content2");
    what.setImage2("Sample Image2");
    what.setSubpoint3("Sample Subpoint3");
    what.setContent3("Sample Content3");
    what.setImage3("Sample Image3");
    what.setSubpoint4("Sample Subpoint4");
    what.setContent4("Sample Content4");
    what.setImage4("Sample Image4");
  }

  @Test
  void getAllWhats() {
    List<What> whatList = Arrays.asList(what);
    when(whatRepository.findAll()).thenReturn(whatList);

    List<What> result = whatService.getAllWhats();

    assertEquals(1, result.size());
    verify(whatRepository, times(1)).findAll();
  }

  @Test
  void getWhatById() {
    when(whatRepository.findById(anyString())).thenReturn(Optional.of(what));

    Optional<What> result = whatService.getWhatById("1");

    assertTrue(result.isPresent());
    assertEquals("1", result.get().getId());
    verify(whatRepository, times(1)).findById("1");
  }

  @Test
  void createWhat() {
    when(whatRepository.save(any(What.class))).thenReturn(what);

    What result = whatService.createWhat(what);

    assertNotNull(result);
    assertEquals("1", result.getId());
    verify(whatRepository, times(1)).save(what);
  }

  @Test
  void updateWhat() {
    when(whatRepository.findById(anyString())).thenReturn(Optional.of(what));
    when(whatRepository.save(any(What.class))).thenReturn(what);

    What updatedWhat = new What();
    updatedWhat.setId("1");
    updatedWhat.setTitle("Updated Title");
    updatedWhat.setSubpoint1("Updated Subpoint1");
    updatedWhat.setContent1("Updated Content1");
    updatedWhat.setImage1("Updated Image1");
    updatedWhat.setSubpoint2("Updated Subpoint2");
    updatedWhat.setContent2("Updated Content2");
    updatedWhat.setImage2("Updated Image2");
    updatedWhat.setSubpoint3("Updated Subpoint3");
    updatedWhat.setContent3("Updated Content3");
    updatedWhat.setImage3("Updated Image3");
    updatedWhat.setSubpoint4("Updated Subpoint4");
    updatedWhat.setContent4("Updated Content4");
    updatedWhat.setImage4("Updated Image4");

    What result = whatService.updateWhat("1", updatedWhat);

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
    verify(whatRepository, times(1)).save(any(What.class));
  }

  @Test
  void deleteWhat() {
    doNothing().when(whatRepository).deleteById(anyString());

    whatService.deleteWhat("1");

    verify(whatRepository, times(1)).deleteById("1");
  }
}
