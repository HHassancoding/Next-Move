package service;

import Entity.Place;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;

@Service
public class PlaceDataService {

  private static final String DATA_FILE = "data/london-places.json";

  private final ObjectMapper objectMapper;

  private List<Place> places = Collections.emptyList();

  public PlaceDataService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @PostConstruct
  public void loadPlaces() {
    try (

        InputStream inputStream = new ClassPathResource(DATA_FILE).getInputStream()
    ) {

      places = objectMapper.readValue(inputStream, new TypeReference<List<Place>>() {});

    } catch (IOException e) {
      throw new RuntimeException("Failed to load places from JSON file: " + DATA_FILE, e);
    }
  }
  public List<Place> getAllPlaces() {
    return Collections.unmodifiableList(places);
  }
}