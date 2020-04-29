package verslane.corporation.blibliogest.book.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import verslane.corporation.blibliogest.book.domain.assembler.BookDtoAssembler;
import verslane.corporation.blibliogest.book.facade.dto.BookDto;
import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;
import verslane.corporation.blibliogest.book.persistence.model.BookEntity;

import verslane.corporation.blibliogest.book.persistence.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private BookDtoAssembler dtoAssembler;

    public Optional < BookEntity > findById(Long id) {
        return bookRepository.findById(id);
    }

    public List < BookDto > findAll() {
        return dtoAssembler.fromModels(bookRepository.findAllByOrderByIdDesc());
    }

    public BookDto findOne(Long id) {
        BookDto bookDto = new BookDto();
        bookDto = dtoAssembler.fromModel(bookRepository.getOne(id));
        return bookDto;
    }

    public List<BookEntity> findByAuthorId(Long id){
        return bookRepository.findByAuthorId(id);
    }

    public void create(BookDto bookDto) {

        if (!authorService.exist(bookDto.getAuthor())) {

            authorService.create(bookDto.getAuthor());
        }

        AuthorEntity author = authorService.findByName(bookDto.getAuthor()).get();
        BookEntity newBook = new BookEntity();
        newBook = dtoAssembler.toModel(bookDto, author);

        try {
            bookRepository.save(newBook);
        } catch (Exception e) {
            System.out.println(e.getCause());
        }

    }

    public void update(Long id, BookDto bookDto) {

        BookEntity bookEntity = new BookEntity();
        Optional < BookEntity > bookUpd = findById(id);
        AuthorEntity previousAuthor = bookUpd.get().getAuthor();

        if (bookUpd.isPresent()) {
            if (!authorService.exist(bookDto.getAuthor())) {
                authorService.create(bookDto.getAuthor());
            }

            AuthorEntity author = authorService.findByName(bookDto.getAuthor()).get();
            bookEntity = dtoAssembler.toModel(bookDto, author);

            try {
                bookRepository.save(bookEntity);
            } catch (Exception e) {
                System.out.println(e.getCause());
            }

           authorService.verifyBookOrCitationExistByAuthor(previousAuthor);

        } else {
            System.out.println("Le livre n'existe pas !");
        }
    }

    public void delete(BookDto bookDto) {
        Optional < BookEntity > bookOpt = findById(bookDto.getId());
        if (bookOpt.isPresent()) {
            bookRepository.delete(bookOpt.get());;
        }
          authorService.verifyBookOrCitationExistByAuthor(authorService.findByName(bookDto.getAuthor()).get());
    }

   
}