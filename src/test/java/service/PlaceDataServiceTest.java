package service;

import Entity.Place;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PlaceDataServiceTest {

  @Mock
  private ObjectMapper objectMapper;

  private PlaceDataService placeDataService;

  @BeforeEach
  void setUp() {
    placeDataService = new PlaceDataService(objectMapper);
  }
  @Test
  void loadPlaces_whenJsonMalformed_throwsRuntimeException() throws IOException {
    when(objectMapper.readValue(any(InputStream.class), any(TypeReference.class)))
        .thenThrow(new IOException("Malformed JSON") {});
    RuntimeException ex = assertThrows(RuntimeException.class, () -> placeDataService.loadPlaces());
    assertInstanceOf(IOException.class, ex.getCause());
    assertTrue(ex.getMessage().contains("Failed to load places"));

  }
  @Test
  void LoadPlaces_whenJsonValid_loadsPlaces() throws IOException {
    List<Place> mockPlaces = List.of(new Place(), new Place());
    when(objectMapper.readValue(any(InputStream.class), any(TypeReference.class))).thenReturn(mockPlaces);
    placeDataService.loadPlaces();
    List<Place> loadedPlaces = placeDataService.getAllPlaces();
    assertEquals(mockPlaces.size(), loadedPlaces.size());
    assertThrows(UnsupportedOperationException.class, () -> loadedPlaces.add(new Place()));
  }






}
