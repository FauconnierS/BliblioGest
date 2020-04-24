package verslane.corporation.blibliogest.book.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;
import verslane.corporation.blibliogest.book.persistence.model.BookEntity;
import verslane.corporation.blibliogest.book.persistence.repository.AuthorRepository;
import verslane.corporation.blibliogest.citation.domain.service.CitationService;
import verslane.corporation.blibliogest.citation.persistence.model.CitationEntity;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private CitationService citationService;

    public Optional < AuthorEntity > findByName(String name) {
        return authorRepository.findByName(name);
    }

    public void create(String name) {
        AuthorEntity newAuthor = new AuthorEntity();
        newAuthor.setName(name);
        authorRepository.save(newAuthor);
    }

    public void delete(AuthorEntity author) {
        authorRepository.delete(author);
    }

    public boolean exist(String name) {

        Optional < AuthorEntity > authorOpt = authorRepository.findByName(name);
        return authorOpt.isPresent();
    }

    public void verifyBookOrCitationExistByAuthor(AuthorEntity author) {
        List < BookEntity > books = bookService.findByAuthorId(author.getId());
        List < CitationEntity > citations = citationService.findByAuthorId(author.getId());

        if (books.isEmpty() && citations.isEmpty()) {
            delete(author);
        }

    }
}