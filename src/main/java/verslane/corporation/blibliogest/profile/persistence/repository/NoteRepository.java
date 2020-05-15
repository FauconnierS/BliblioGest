package verslane.corporation.blibliogest.profile.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import verslane.corporation.blibliogest.profile.persistence.model.NoteEntity;

@Repository
public interface NoteRepository extends JpaRepository<NoteEntity , Long> {
    List<NoteEntity> findByUserId (Long id );
}