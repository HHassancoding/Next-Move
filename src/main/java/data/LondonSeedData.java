package data;

import Entity.Budget;
import Entity.Place;
import Entity.Type;

import java.util.ArrayList;
import java.util.List;

public class LondonSeedData {

  public static List<Place> getPlaces() {
    List<Place> places = new ArrayList<>();

    Place p1 = new Place();
    p1.setId(1);
    p1.setName("Horizon 22");
    p1.setArea("City of London");
    p1.setType(Type.VIEW);
    p1.setBudget(Budget.FREE);
    p1.setDescription("London's highest free public viewing gallery with panoramic skyline views.");
    p1.setDistance(3);
    places.add(p1);

    Place p2 = new Place();
    p2.setId(2);
    p2.setName("Dishoom Shoreditch");
    p2.setArea("Shoreditch");
    p2.setType(Type.FOOD);
    p2.setBudget(Budget.CHEAP);
    p2.setDescription("Popular Bombay-style café with great atmosphere and strong brunch and dinner options.");
    p2.setDistance(2);
    places.add(p2);

    Place p3 = new Place();
    p3.setId(3);
    p3.setName("Leake Street Arches");
    p3.setArea("Waterloo");
    p3.setType(Type.ACTIVITY);
    p3.setBudget(Budget.CHEAP);
    p3.setDescription("A graffiti-filled tunnel under Waterloo with street art, bars, food and pop-up entertainment.");
    p3.setDistance(1);
    places.add(p3);

    return places;
  }
}