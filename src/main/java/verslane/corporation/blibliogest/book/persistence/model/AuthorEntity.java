package verslane.corporation.blibliogest.book.persistence.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import verslane.corporation.blibliogest.citation.persistence.model.CitationEntity;

@Entity
@Table(name = "author")
public class AuthorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ; 

    private String name ; 

    @OneToMany(mappedBy = "author") 
    private List<BookEntity> books ; 

    @OneToMany(mappedBy = "author")
    private List<CitationEntity> citations; 
    
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BookEntity> getBooks() {
        return this.books;
    }

    public void setBooks(List<BookEntity> books) {
        this.books = books;
    }
}
