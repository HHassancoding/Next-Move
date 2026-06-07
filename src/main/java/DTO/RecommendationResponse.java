package DTO;

import Entity.Type;
import lombok.Data;

@Data
public class RecommendationResponse {
  private String name;
  private String location;
  private String distance;
  private String description;
  private Type type;
}
