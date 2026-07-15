package service;

import org.example.Entity.Budget;
import org.example.Entity.Place;
import org.example.Entity.Type;
import org.example.service.PlaceDataService;
import org.example.service.RecommendationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RecommendationServiceTest {

  @Mock
  private PlaceDataService placeDataService;
  private RecommendationService recommendationService;

  @BeforeEach
  void setUp() {
    recommendationService = new RecommendationService(placeDataService);
  }

  @Test
  void MatchingPlacesUsesFilters(){
    List<Place> places = List.of(
        createPlace(1L, "Leake Street Arches", Type.ACTIVITY, Budget.CHEAP, 51.5035, -0.1121),
        createPlace(2L, "Dishoom Shoreditch", Type.FOOD, Budget.CHEAP, 51.0, -0.1),
        createPlace(3L, "Sky Garden", Type.ACTIVITY, Budget.CHEAP, 51.5, -0.1)
    );
    when(placeDataService.getAllPlaces()).thenReturn(places);

    List<Place> recommendations = recommendationService.getRecommendations(
        null,
        null,
        Type.ACTIVITY,
        Budget.CHEAP,
        List.of(1L)  // Example excluded place ID
    );
    assertEquals(1, recommendations.size());
    assertEquals(places.get(2).getType(), recommendations.getFirst().getType());
    assertEquals(places.get(2).getId(), recommendations.getFirst().getId());
  }

  @Test
  void getRecommendations_withCoordinates_returnsClosestPlace(){
    List<Place> places = List.of(
        createPlace(1L, "Far", Type.ACTIVITY, Budget.CHEAP, 52.0, -0.5),
        createPlace(2L, "Mid", Type.ACTIVITY, Budget.CHEAP, 51.6, -0.2),
        createPlace(3L, "Near", Type.ACTIVITY, Budget.CHEAP, 51.5036, -0.1120)
    );
    when(placeDataService.getAllPlaces()).thenReturn(places);

    List<Place> recommendations = recommendationService.getRecommendations(
        51.5035,
        -0.1121,
        Type.ACTIVITY,
        Budget.CHEAP,
        List.of()  // No excluded places
    );
    assertEquals(1, recommendations.size());
    assertEquals("Near", recommendations.getFirst().getName());
  }

  @Test
  void calculateDistanceKmShouldBeZeroForSamePoint() {
    double distance = recommendationService.calculateDistanceKm(51.5035, -0.1121, 51.5035, -0.1121);

    assertEquals(0.0, distance, 0.0001);
  }


  private Place createPlace(Long id, String name, Type type, Budget budget, double latitude, double longitude) {
    Place place = new Place();
    place.setId(id);
    place.setName(name);
    place.setType(type);
    place.setBudget(budget);
    place.setLatitude(latitude);
    place.setLongitude(longitude);
    return place;
  }
}


