package Entity;

import lombok.Data;

@Data
public class Place {
  private int id;
  private String name;
  private String area;
  private Type type;
  private Budget budget;
  private String description;
  private double latitude;
  private double longitude;
}
