package verslane.corporation.blibliogest.book.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;
import verslane.corporation.blibliogest.book.persistence.repository.AuthorRepository;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public void create(String name) {
        AuthorEntity newAuthor = new AuthorEntity();
        newAuthor.setName(name);
        authorRepository.save(newAuthor);
    }

    public boolean exist(String name) {

        Optional < AuthorEntity > authorOpt = authorRepository.findByName(name);

        return authorOpt.isPresent();
    }

}