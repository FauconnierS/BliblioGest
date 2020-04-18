package verslane.corporation.blibliogest.book.domain.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.SourceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import verslane.corporation.blibliogest.book.domain.assembler.BookDtoAssembler;
import verslane.corporation.blibliogest.book.facade.dto.BookDto;
import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;
import verslane.corporation.blibliogest.book.persistence.model.BookEntity;
import verslane.corporation.blibliogest.book.persistence.repository.AuthorRepository;
import verslane.corporation.blibliogest.book.persistence.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private AuthorRepository authorepository;

    @Autowired
    private BookDtoAssembler dtoAssembler;

    public Optional < BookEntity > findById(Long id) {
        return bookRepository.findById(id);
    }

    public List < BookDto > findAll() {
        return dtoAssembler.fromModels(bookRepository.findAll());
    }

    public BookDto findOne(Long id) {
        BookDto bookDto = new BookDto();
        bookDto = dtoAssembler.fromModel(bookRepository.getOne(id));
        return bookDto;
    }

    public void create(BookDto bookDto) {

        if (authorService.exist(bookDto.getAuthor())) {

            AuthorEntity author = authorepository.findByName(bookDto.getAuthor()).get();
            BookEntity newBook = new BookEntity();

            newBook = dtoAssembler.toModel(bookDto, author);
            bookRepository.save(newBook);

        } else {
            System.out.println("L'auteur demandé n'existe pas ");
        }
    }

    public void update(Long id, BookDto bookDto) {
        BookEntity bookEntity = new BookEntity();
        Optional < BookEntity > bookUpd = findById(id);
        if (bookUpd.isPresent()) {
            if (authorService.exist(bookDto.getAuthor())) {
                AuthorEntity author = authorepository.findByName(bookDto.getAuthor()).get();
                bookEntity = dtoAssembler.toModel(bookDto, author);
                bookRepository.save(bookEntity);
            } else {
                System.out.println("L'auteur n'existe pas !");
            }
        } else {
            System.out.println("Le libre n'existe pas !");
        }
    }
    
    public void delete(Long id) {
        Optional < BookEntity > bookOpt = findById(id);
        if (bookOpt.isPresent()) {
            bookRepository.delete(bookOpt.get());;
        }
    }

}