package verslane.corporation.blibliogest.book.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;

@Repository
public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {

    Optional <AuthorEntity>findByName(String name) ; 

}