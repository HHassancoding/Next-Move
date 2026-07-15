package org.example.service;

import org.example.Entity.Budget;
import org.example.Entity.Place;
import org.example.Entity.Type;
import org.example.Repositories.PlaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceDataService {

  private final PlaceRepository placeRepository;

  public PlaceDataService(PlaceRepository placeRepository) {
    this.placeRepository = placeRepository;
  }

  public List<Place> getAllPlaces() {
    return placeRepository.findAll();
  }

  public List<Place> getPlacesByType(Type type) {
    return placeRepository.findByType(type);
  }

  public List<Place> getPlacesByBudget(Budget budget) {
    return placeRepository.findByBudget(budget);
  }

  public List<Place> getPlacesByArea(String area) {
    return placeRepository.findByArea(area);
  }

  public List<Place> getPlacesByTypeAndBudget(Type type, Budget budget) {
    return placeRepository.findByTypeAndBudget(type, budget);
  }
}

