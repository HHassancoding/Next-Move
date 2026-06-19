package controller;

import DTO.RecommendationRequest;
import DTO.RecommendationResponse;
import Entity.Place;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.RecommendationService;

@RestController
@RequestMapping("/api")
public class RecommendationController {

  private final RecommendationService recommendationService;


  public RecommendationController(RecommendationService recommendationService) {
    this.recommendationService = recommendationService;
  }

  @PostMapping("/recommendations")
  public ResponseEntity<List<RecommendationResponse>> recommendation(
      @Valid @RequestBody RecommendationRequest request
  ){
    System.out.println("Received recommendation request: " + request);
    List<Place> matches = recommendationService.getRecommendations(
        request.getLatitude(),
        request.getLongitude(),
        request.getType(),
        request.getBudget(),
        request.getExcludedPlacesID()
    );
    System.out.println("Found " + matches.size() + " matches for request: " + request);

    if(matches.isEmpty()) {
      System.out.println("No matches found for request: " + request);
      return ResponseEntity.ok().build();
    }
    List<RecommendationResponse> response = matches.stream().map(p -> {
      RecommendationResponse r = new RecommendationResponse();
      r.setId(p.getId());
      r.setName(p.getName());
      r.setLocation(p.getArea());
      if (recommendationService.hasCoordinates(request.getLatitude(), request.getLongitude())) {
        double distanceKm = recommendationService.calculateDistanceKm(
            request.getLatitude(),
            request.getLongitude(),
            p.getLatitude(),
            p.getLongitude()
        );
        r.setDistance(recommendationService.formatDistanceKm(distanceKm));
      } else {
        r.setDistance("N/A");
      }
      r.setDescription(p.getDescription());
      r.setType(p.getType());
      return r;
    }).toList();
    return ResponseEntity.ok(response);
  }


}
