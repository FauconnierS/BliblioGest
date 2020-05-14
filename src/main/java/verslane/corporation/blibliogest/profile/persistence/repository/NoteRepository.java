package verslane.corporation.blibliogest.profile.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import verslane.corporation.blibliogest.profile.persistence.model.NoteEntity;

public interface NoteRepository extends JpaRepository<NoteEntity , Long> {
    
}