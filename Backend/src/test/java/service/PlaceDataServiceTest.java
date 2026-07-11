package service;

import Entity.Place;
import Repositories.PlaceRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PlaceDataServiceTest {

  @Mock
  private PlaceRepository placeRepository;

  private PlaceDataService placeDataService;

  @BeforeEach
  void setUp() {
    placeDataService = new PlaceDataService(placeRepository);
  }
  
  @Test
  void getAllPlaces_returnsAllPlaces() {
    List<Place> mockPlaces = List.of(new Place(), new Place());
    when(placeRepository.findAll()).thenReturn(mockPlaces);
    
    List<Place> loadedPlaces = placeDataService.getAllPlaces();
    
    assertEquals(mockPlaces.size(), loadedPlaces.size());
    assertEquals(2, loadedPlaces.size());
  }






}
