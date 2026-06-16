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
    p1.setLatitude(51.5149);
    p1.setLongitude(-0.0805);
    places.add(p1);

    Place p2 = new Place();
    p2.setId(2);
    p2.setName("Dishoom Shoreditch");
    p2.setArea("Shoreditch");
    p2.setType(Type.FOOD);
    p2.setBudget(Budget.CHEAP);
    p2.setDescription("Popular Bombay-style café with great atmosphere and strong brunch and dinner options.");
    p2.setLatitude(51.5247);
    p2.setLongitude(-0.0783);
    places.add(p2);

    Place p3 = new Place();
    p3.setId(3);
    p3.setName("Leake Street Arches");
    p3.setArea("Waterloo");
    p3.setType(Type.ACTIVITY);
    p3.setBudget(Budget.CHEAP);
    p3.setDescription("A graffiti-filled tunnel under Waterloo with street art, bars, food and pop-up entertainment.");
    p3.setLatitude(51.5031);
    p3.setLongitude(-0.1132);
    places.add(p3);
    Place p20 = new Place();
    p1.setId(20);
    p1.setName("Bar Italia");
    p1.setArea("Soho");
    p1.setType(Type.FOOD);
    p1.setBudget(Budget.CHEAP);
    p1.setDescription("Iconic late-opening Italian café ideal for post-theatre coffee or quick casual bite.");
    p1.setLatitude(51.5134174);
    p1.setLongitude(-0.1311994);
    places.add(p1);

    Place p21 = new Place();
    p2.setId(21);
    p2.setName("The Breakfast Club Soho");
    p2.setArea("Soho");
    p2.setType(Type.FOOD);
    p2.setBudget(Budget.MEDIUM);
    p2.setDescription("Bustling all-day brunch spot with hearty plates, good for fuelling up after central plans.");
    p2.setLatitude(51.5147);
    p2.setLongitude(-0.1354);
    places.add(p2);

    Place p23 = new Place();
    p3.setId(23);
    p3.setName("Chinatown Gerrard Street");
    p3.setArea("Soho");
    p3.setType(Type.FOOD);
    p3.setBudget(Budget.MEDIUM);
    p3.setDescription("Lively street packed with Chinese restaurants and bakeries, perfect for spontaneous group dinners or snacks.");
    p3.setLatitude(51.511822);
    p3.setLongitude(-0.131695);
    places.add(p3);

    Place p4 = new Place();
    p4.setId(4);
    p4.setName("Boxpark Shoreditch");
    p4.setArea("Shoreditch");
    p4.setType(Type.FOOD);
    p4.setBudget(Budget.CHEAP);
    p4.setDescription("Shipping-container street food mall with bars and loud music, easy central meeting point.");
    p4.setLatitude(51.5235297);
    p4.setLongitude(-0.0769493);
    places.add(p4);

    Place p5 = new Place();
    p5.setId(5);
    p5.setName("Dishoom Shoreditch");
    p5.setArea("Shoreditch");
    p5.setType(Type.FOOD);
    p5.setBudget(Budget.MEDIUM);
    p5.setDescription("Bombay-style restaurant with shared plates and cocktails, good for longer catchups after Shoreditch exploring.");
    p5.setLatitude(51.5245213);
    p5.setLongitude(-0.0750);
    places.add(p5);

    Place p6 = new Place();
    p6.setId(6);
    p6.setName("Camden Market");
    p6.setArea("Camden");
    p6.setType(Type.ACTIVITY);
    p6.setBudget(Budget.CHEAP);
    p6.setDescription("Sprawling canalside market of food stalls, vintage shops and music, easy to wander without plans.");
    p6.setLatitude(51.541397);
    p6.setLongitude(-0.146612);
    places.add(p6);

    Place p7 = new Place();
    p7.setId(7);
    p7.setName("Chin Chin Labs Camden");
    p7.setArea("Camden");
    p7.setType(Type.FOOD);
    p7.setBudget(Budget.CHEAP);
    p7.setDescription("Nitro ice-cream shop inside Camden Market, fun quick stop after browsing nearby stalls.");
    p7.setLatitude(51.541403);
    p7.setLongitude(-0.1463108);
    places.add(p7);

    Place p8 = new Place();
    p8.setId(8);
    p8.setName("The Jazz Cafe");
    p8.setArea("Camden");
    p8.setType(Type.ACTIVITY);
    p8.setBudget(Budget.MEDIUM);
    p8.setDescription("Intimate live music venue with balcony seating, ideal for catching evening gigs after market hangs.");
    p8.setLatitude(51.536664);
    p8.setLongitude(-0.139333);
    places.add(p8);

    Place p9 = new Place();
    p9.setId(9);
    p9.setName("London Eye");
    p9.setArea("South Bank");
    p9.setType(Type.VIEW);
    p9.setBudget(Budget.EXPENSIVE);
    p9.setDescription("Huge riverside observation wheel offering classic skyline views, works well as a post-dinner highlight.");
    p9.setLatitude(51.503399);
    p9.setLongitude(-0.119519);
    places.add(p9);

    Place p10 = new Place();
    p10.setId(10);
    p10.setName("Southbank Centre");
    p10.setArea("South Bank");
    p10.setType(Type.ACTIVITY);
    p10.setBudget(Budget.FREE);
    p10.setDescription("Arts complex with free riverside seating, cafes and regular events, easy fallback plan near Waterloo.");
    p10.setLatitude(51.506065);
    p10.setLongitude(-0.11644);
    places.add(p10);

    Place p11 = new Place();
    p11.setId(11);
    p11.setName("Bussey Rooftop Bar");
    p11.setArea("Peckham");
    p11.setType(Type.ACTIVITY);
    p11.setBudget(Budget.MEDIUM);
    p11.setDescription("Rooftop bar with city views, covered seating and pizzas, good for sunset drinks after Peckham plans.");
    p11.setLatitude(51.469831);
    p11.setLongitude(-0.068044);
    places.add(p11);

    Place p12 = new Place();
    p12.setId(12);
    p12.setName("Peckham Levels");
    p12.setArea("Peckham");
    p12.setType(Type.ACTIVITY);
    p12.setBudget(Budget.CHEAP);
    p12.setDescription("Multi-storey creative hub in old car park with street food, studios and casual bar spaces.");
    p12.setLatitude(51.470874);
    p12.setLongitude(-0.068576);
    places.add(p12);

    Place p13 = new Place();
    p13.setId(13);
    p13.setName("Greenwich Market");
    p13.setArea("Greenwich");
    p13.setType(Type.FOOD);
    p13.setBudget(Budget.CHEAP);
    p13.setDescription("Covered historic market with varied street food stalls, nice meetup spot between park walks and river.");
    p13.setLatitude(51.481579);
    p13.setLongitude(-0.009138);
    places.add(p13);

    Place p14 = new Place();
    p14.setId(14);
    p14.setName("Greenwich Park Viewpoint");
    p14.setArea("Greenwich");
    p14.setType(Type.VIEW);
    p14.setBudget(Budget.FREE);
    p14.setDescription("Hilltop viewpoint by General Wolfe statue overlooking Canary Wharf and river, great low-effort scenic pause.");
    p14.setLatitude(51.477714);
    p14.setLongitude(-0.000737);
    places.add(p14);

    Place p15 = new Place();
    p15.setId(15);
    p15.setName("Granary Square Fountains");
    p15.setArea("King's Cross");
    p15.setType(Type.VIEW);
    p15.setBudget(Budget.FREE);
    p15.setDescription("Large riverside-style square with choreographed fountains and plenty of seating, ideal between trains or meetups.");
    p15.setLatitude(51.53540);
    p15.setLongitude(-0.1253);
    places.add(p15);

    Place p16 = new Place();
    p16.setId(16);
    p16.setName("Coal Drops Yard");
    p16.setArea("King's Cross");
    p16.setType(Type.ACTIVITY);
    p16.setBudget(Budget.MEDIUM);
    p16.setDescription("Restored railway arches now housing shops, bars and restaurants, relaxed place to drift after central commitments.");
    p16.setLatitude(51.535179);
    p16.setLongitude(-0.124691);
    places.add(p16);

    Place p17 = new Place();
    p17.setId(17);
    p17.setName("Dishoom King's Cross");
    p17.setArea("King's Cross");
    p17.setType(Type.FOOD);
    p17.setBudget(Budget.MEDIUM);
    p17.setDescription("Popular Bombay café-style restaurant near Granary Square, good for unhurried dinners before or after trains.");
    p17.setLatitude(51.535179);
    p17.setLongitude(-0.124691);
    places.add(p17);

    Place p18 = new Place();
    p18.setId(18);
    p18.setName("Camden Lock Canalside Steps");
    p18.setArea("Camden");
    p18.setType(Type.VIEW);
    p18.setBudget(Budget.FREE);
    p18.setDescription("Canalside steps overlooking Camden Lock, easy spot to sit with takeaway food and people-watch.");
    p18.setLatitude(51.541397);
    p18.setLongitude(-0.146612);
    places.add(p18);

    Place p19 = new Place();
    p19.setId(19);
    p19.setName("Leake Street Graffiti Tunnel");
    p19.setArea("Waterloo");
    p19.setType(Type.ACTIVITY);
    p19.setBudget(Budget.FREE);
    p19.setDescription("Long legal graffiti tunnel under Waterloo station, good for quick wander between South Bank plans.");
    p19.setLatitude(51.5025);
    p19.setLongitude(-0.1132);
    places.add(p19);

    Place p25 = new Place();
    p20.setId(25);
    p20.setName("Southbank Undercroft Skate Space");
    p20.setArea("South Bank");
    p20.setType(Type.ACTIVITY);
    p20.setBudget(Budget.FREE);
    p20.setDescription("Iconic riverside skate undercroft with graffiti and ledges, interesting place to watch or hang out.");
    p20.setLatitude(51.506065);
    p20.setLongitude(-0.11644);
    places.add(p20);

    return places;
  }
}