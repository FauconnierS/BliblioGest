package verslane.corporation.blibliogest.book.domain.assembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import verslane.corporation.blibliogest.book.facade.dto.BookDto;
import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;
import verslane.corporation.blibliogest.book.persistence.model.BookEntity;
import verslane.corporation.blibliogest.book.persistence.model.GenreEnum;

@Component
public class BookDtoAssembler {

    public List < BookDto > fromModels(List < BookEntity > books) {
        List < BookDto > bookDtos = new ArrayList < > ();
        for (BookEntity book: books) {
            bookDtos.add(fromModel(book));
        }
        return bookDtos;
    }

    public BookDto fromModel(BookEntity book) {
        BookDto dto = new BookDto();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor().getName());
        dto.setYear(book.getYear());
        dto.setGenre(book.getGenre().toLowerCase());
        return dto;
    }
    
    public BookEntity toModel(BookDto bookDto,AuthorEntity author){
        BookEntity book = new BookEntity(); 
        book.setId(bookDto.getId());
        book.setTitle(bookDto.getTitle());
        book.setYear(bookDto.getYear());
        book.setAuthor(author);
        book.setGenre(GenreEnum.valueOf(bookDto.getGenre().toUpperCase()));
        return book ; 
    }

}