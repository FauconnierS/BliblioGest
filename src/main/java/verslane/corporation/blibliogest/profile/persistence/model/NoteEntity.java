package verslane.corporation.blibliogest.profile.persistence.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import verslane.corporation.blibliogest.auth.persistence.model.UserEntity;

@Entity
public class NoteEntity {
    
    private Long id ; 

    private String book ; 

    private String chapter ; 

    private String page ; 

    private String comentary ;

    @ManyToOne
    private UserEntity user ; 

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBook() {
        return book;
    }

    public void setBook(String book) {
        this.book = book;
    }

    public String getChapter() {
        return chapter;
    }

    public void setChapter(String chapter) {
        this.chapter = chapter;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    public String getComentary() {
        return comentary;
    }

    public void setComentary(String comentary) {
        this.comentary = comentary;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
    
    
}