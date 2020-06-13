package verslane.corporation.blibliogest.profile.facade.dto;

public class NoteDto {

    private Long id ; 

    private String book ; 

    private String chapter ; 

    private String  page  ;
    
    private String commentary ; 

    private long user ;

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

    public String getCommentary() {
        return commentary;
    }

    public void setCommentary(String commentary) {
        this.commentary = commentary;
    }

    public long getUser() {
        return user;
    }

    public void setUser(long user) {
        this.user = user;
    }



    
}