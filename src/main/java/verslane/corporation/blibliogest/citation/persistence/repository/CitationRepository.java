package verslane.corporation.blibliogest.citation.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import verslane.corporation.blibliogest.citation.persistence.model.CitationEntity;

@Repository
public interface CitationRepository extends JpaRepository<CitationEntity, Long>{

	List<CitationEntity> findByAuthorId(Long id);
	List<CitationEntity> findAllByOrderByIdDesc ();

    
}