package verslane.corporation.blibliogest.book.facade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import verslane.corporation.blibliogest.book.domain.service.BookService;
import verslane.corporation.blibliogest.book.facade.dto.BookDto;


@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/")
    public List < BookDto > listBook() {
        return bookService.findAll();
    }


    @GetMapping("/{bookId}")
    public BookDto bookDetail(@PathVariable("bookId") Long id) {
        return bookService.findOne(id);
    }

    @PostMapping("/create")
    public void createBook(@RequestBody BookDto bookDto) {
        bookService.create(bookDto);
    }

    @PostMapping("/update")
    public void updateBook(@RequestBody BookDto bookDto) {
        bookService.update(bookDto.getId(), bookDto);
    }

    @PostMapping("/delete")
    public void deleteBook(@RequestBody BookDto bookDto) {
        bookService.delete(bookDto);
    }

}