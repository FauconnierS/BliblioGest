package verslane.corporation.blibliogest.citation.persistence.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;

@Entity
@Table(name = "citation")
public class CitationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private String text ;

    @ManyToOne
    private AuthorEntity author; 


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public AuthorEntity getAuthor() {
        return this.author;
    }

    public void setAuthor(AuthorEntity author) {
        this.author = author;
    }

}