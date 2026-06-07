package service;

import data.LondonSeedData;
import Entity.Budget;
import Entity.Place;
import Entity.Type;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

/**
 * Service layer responsible for producing recommendations.
 * <p>
 * Main responsibilities:
 * - Ask the seed data for all places
 * - Filter that list based on caller-supplied criteria (type, budget, area, distance...)
 * - Optionally sort or rank results before returning
 */
@Service
public class RecommendationService {

  /**
   * Return the raw list of places from the seed data. Kept as a separate method
   * to make testing and future changes (e.g. caching, DB) easier.
   */
  public List<Place> getAllPlaces() {
	return LondonSeedData.getPlaces();
  }


	public List<Place> getRecommendations(Type type, Budget budget) {
	List<Predicate<Place>> filters = new ArrayList<>();
		if(type != null) {
			filters.add(p -> Objects.equals(p.getType(), type));
		}
		if(budget != null) {
			filters.add(p -> Objects.equals(p.getBudget(), budget));
		}
		Predicate<Place> combinedFilter = filters.stream().reduce(p -> true, Predicate::and);

		return getAllPlaces().stream()
			.filter(combinedFilter)
			.sorted(Comparator.comparingInt(Place::getDistance))
			.limit(1)
			.collect(Collectors.toList());
	}





}
