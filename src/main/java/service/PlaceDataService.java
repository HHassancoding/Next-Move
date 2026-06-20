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

  /*
   * HIGH-YIELD:
   * This is the path inside src/main/resources.
   *
   * If your file lives at:
   * src/main/resources/data/london-places.json
   *
   * then the classpath path is:
   * data/london-places.json
   */
  private static final String DATA_FILE = "data/london-places.json";

  /*
   * HIGH-YIELD:
   * This is a dependency.
   * We want Spring to give us the application's configured ObjectMapper.
   *
   * WHY?
   * - avoids manually creating framework objects
   * - keeps configuration consistent across the app
   * - works well with constructor injection
   *
   :
   * Make this field final.
   */
  private final ObjectMapper objectMapper;

  /*
   * This is where we cache the loaded places in memory.
   * We start with an empty list so the field is always initialized.
   *
   * You do NOT need to over-focus on Collections.emptyList().
   * It is just a clean default starting value.
   */
  private List<Place> places = Collections.emptyList();

  /*
   * HIGH-YIELD:
   * Write the constructor yourself.
   *
   * Goal:
   * - accept ObjectMapper as a parameter
   * - assign it to the field
   *
   * Why constructor injection?
   * Because this service cannot work without ObjectMapper.
   * Required dependencies belong in the constructor.
   */
  public PlaceDataService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  /*
   * HIGH-YIELD:
   * This method should run once when the bean is created.
   *
   * Add the correct annotation above the method.
   * That annotation tells Spring:
   * "after dependencies are injected, run this initialization method"
   *
   * Inside this method you need to:
   * 1. open the JSON file from the classpath
   * 2. deserialize it into List<Place>
   * 3. store it in the 'places' field
   * 4. throw a useful exception if loading fails
   *
   * IMPORTANT:
   * Use getInputStream(), not getFile().
   */
  @PostConstruct
  public void loadPlaces() {
    try (
        /*
         * HIGH-YIELD:
         * You should write this line.
         *
         * Goal:
         * create an InputStream from the classpath resource.
         *
         * Hint:
         * new ClassPathResource(DATA_FILE).getInputStream()
         */
        InputStream inputStream = new ClassPathResource(DATA_FILE).getInputStream()
    ) {
      /*
       * HIGH-YIELD:
       * You should write this line too.
       *
       * Goal:
       * Use objectMapper.readValue(...)
       * to convert the JSON array into List<Place>.
       *
       * Hint:
       * readValue(inputStream, new TypeReference<List<Place>>() {})
       */
      // places = ...
      places  = objectMapper.readValue(inputStream, new TypeReference<List<Place>>() {});

    } catch (IOException e) {
      /*
       * HIGH-YIELD:
       * You should decide what exception to throw here.
       *
       * Best idea:
       * throw a runtime exception that clearly explains startup failed
       * because the JSON data could not be loaded.
       *
       * Good candidate:
       * IllegalStateException
       */
      throw new RuntimeException("Failed to load places from JSON file: " + DATA_FILE, e);
    }
  }

  /*
   * HIGH-YIELD:
   * This method is your public API.
   * Other classes should ask this service for places.
   *
   * Nice improvement:
   * return an unmodifiable list so other services cannot accidentally
   * mutate your in-memory data.
   *
   * I want you to write this one.
   *
   * Options:
   * - return places;
   * - better: return Collections.unmodifiableList(places);
   */
  public List<Place> getAllPlaces() {

    return Collections.unmodifiableList(places);
  }
}