
package verslane.corporation.blibliogest.book.facade.dto;


import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;





public class BookDto {
 

    private Long id; 

    @NotBlank
    @Size(min = 3, max = 50, message = "Votre titre doit contenir au moins 3 caractères.")  
    private String title ; 

    @NotBlank
    @Min(value = 1500 , message = "Des livres du XIV ème siècle ?? Suspect tout ça!")
    @Max(value = 2020 , message = "Vos livres ne peuvent pas être sorti l'année prochaine!!")
    private String year; 

    @NotBlank
    @Size(min = 4, max = 25 , message = "Le nom de l'auteur doit contenir 4 caractère minimum.")
    private String author ; 

    @NotBlank
    private String genre ; 



    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return this.year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return this.genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }


}