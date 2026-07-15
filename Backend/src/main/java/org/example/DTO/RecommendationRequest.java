package org.example.DTO;

import org.example.Entity.Budget;
import org.example.Entity.Type;
import java.util.List;
import lombok.Data;

@Data
public class RecommendationRequest {
  private String location;
  private Double latitude;
  private Double longitude;
  private Type type;
  private Budget budget;
  private List<Long> excludedPlacesID;
}
