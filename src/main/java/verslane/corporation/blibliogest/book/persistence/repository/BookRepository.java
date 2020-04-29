package verslane.corporation.blibliogest.book.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import verslane.corporation.blibliogest.book.persistence.model.BookEntity;

@Repository
public interface BookRepository extends JpaRepository<BookEntity,Long> {

    List<BookEntity> findByAuthorId (Long id) ;
    List<BookEntity> findAllByOrderByIdDesc () ;

}
