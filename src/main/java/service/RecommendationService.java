package service;

import data.LondonSeedData;
import Entity.Budget;
import Entity.Place;
import Entity.Type;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.stereotype.Service;

/**
 * Service layer responsible for producing recommendations.
 * <p>
 * Main responsibilities:
 * - Ask the seed data for all places
 * - Filter that list based on caller-supplied criteria (type, budget, etc.)
 * - Optionally sort or rank results using runtime coordinates before returning
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


	public List<Place> getRecommendations(Double userLatitude, Double userLongitude, Type type, Budget budget, List<Long> excludePlaceIds) {
	List<Predicate<Place>> filters = new ArrayList<>();
		if(type != null) {
			filters.add(p -> Objects.equals(p.getType(), type));
		}
		if(budget != null) {
			filters.add(p -> Objects.equals(p.getBudget(), budget));
		}
		if(excludePlaceIds != null && !excludePlaceIds.isEmpty()) {
			filters.add(p -> !excludePlaceIds.contains(p.getId()));
		}
		Predicate<Place> combinedFilter = filters.stream().reduce(p -> true, Predicate::and);

		Stream<Place> stream = getAllPlaces().stream()
			.filter(combinedFilter);

		if (hasCoordinates(userLatitude, userLongitude)) {
			stream = stream.sorted(Comparator.comparingDouble(place ->
				calculateDistanceKm(userLatitude, userLongitude, place.getLatitude(), place.getLongitude())
			));
		}

		return stream
			.limit(1)
			.collect(Collectors.toList());
	}

	public boolean hasCoordinates(Double latitude, Double longitude) {
		return latitude != null && longitude != null;
	}

	public double calculateDistanceKm(double startLatitude, double startLongitude, double endLatitude, double endLongitude) {
		final double earthRadiusKm = 6371.0;
		double dLat = Math.toRadians(endLatitude - startLatitude);
		double dLon = Math.toRadians(endLongitude - startLongitude);

		double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
			+ Math.cos(Math.toRadians(startLatitude))
			* Math.cos(Math.toRadians(endLatitude))
			* Math.sin(dLon / 2) * Math.sin(dLon / 2);

		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return earthRadiusKm * c;
	}

	public String formatDistanceKm(double distanceKm) {
		return String.format(Locale.US, "%.1f km", distanceKm);
	}





}
