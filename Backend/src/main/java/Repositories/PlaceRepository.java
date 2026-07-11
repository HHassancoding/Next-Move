package Repositories;

import Entity.Budget;
import Entity.Place;
import Entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByType(Type type);
    
    List<Place> findByBudget(Budget budget);
    
    List<Place> findByArea(String area);
    
    List<Place> findByTypeAndBudget(Type type, Budget budget);
}

