package org.example.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "place")
public class Place {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String area;
  @Enumerated(EnumType.STRING)
  private Type type;
  @Enumerated(EnumType.STRING)
  private Budget budget;
  private String description;
  private double latitude;
  private double longitude;
  private Long excludePlaceId;
}
