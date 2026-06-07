package DTO;

import Entity.Budget;
import Entity.Type;
import lombok.Data;

@Data
public class RecommendationRequest {
  private String location;
  private Type type;
  private Budget budget;
}
