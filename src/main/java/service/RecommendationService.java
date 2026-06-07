package service;

import data.LondonSeedData;
import Entity.Budget;
import Entity.Place;
import Entity.Type;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * Service layer responsible for producing recommendations.
 * <p>
 * Main responsibilities:
 * - Ask the seed data for all places
 * - Filter that list based on caller-supplied criteria (type, budget, area, distance...)
 * - Optionally sort or rank results before returning
 */
public class RecommendationService {

  /**
   * Return the raw list of places from the seed data. Kept as a separate method
   * to make testing and future changes (e.g. caching, DB) easier.
   */
  public List<Place> getAllPlaces() {
	return LondonSeedData.getPlaces();
  }

  /**
   * Simple example: filter by type and budget. Either parameter may be null,
   * which means "don't filter by that criterion".
   */
  public List<Place> getRecommendations(Type type, Budget budget) {
	List<Place> allPlaces = getAllPlaces();

	Predicate<Place> matchesType = p -> type == null || Objects.equals(p.getType(), type);
	Predicate<Place> matchesBudget = p -> budget == null || Objects.equals(p.getBudget(), budget);

	return allPlaces.stream()
		.filter(matchesType.and(matchesBudget))
		// Example of a stable sort: you can change this to any ranking you prefer
		.sorted(Comparator.comparingInt(Place::getDistance))
		.collect(Collectors.toList());
  }

  // --- High-value places for you to implement next (exercises) ---
  // 1) Add a method that accepts an object/DTO with optional fields instead of separate params.
  //    This reduces method proliferation and keeps filtering logic in one place.
  // 2) Make filters composable: build a List<Predicate<Place>> from provided criteria
  //    and then reduce them with Predicate::and before streaming.
  // 3) Add unit tests for each filtering scenario (nulls, missing fields, boundary distances).
  // 4) Add caching (e.g. in-memory) for getAllPlaces() if seed or DB lookups become expensive.
  // 5) Introduce ranking/scoring (weights for type match, budget match, proximity, popularity)
  //    and sort by score instead of a single field.
  // 6) Consider moving to a Repository pattern if you switch from seed data to a DB.

}
