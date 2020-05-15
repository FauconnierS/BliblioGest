package verslane.corporation.blibliogest.profile.facade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import verslane.corporation.blibliogest.profile.domain.service.NoteService;
import verslane.corporation.blibliogest.profile.facade.dto.NoteDto;

@RestController
@RequestMapping("/note")
public class NoteController {
    
    @Autowired
    private NoteService noteService ;

    @GetMapping("/")
    public List <NoteDto> currentNote(Authentication authenticate){

        return noteService.findAllById(authenticate);
    }
    
}