package verslane.corporation.blibliogest.citation.facade.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CitationDto {


    private Long id ; 

    @NotBlank
    @Size(min = 6 , message = "Une citation doit contenir au minimum 6 caractère pour être valide")
    private String text ; 

    @NotBlank
    @Size(min = 4, max = 25 , message = "Le nom de l'auteur doit contenir 4 caractère minimum.")
    private String author ; 


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

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

}