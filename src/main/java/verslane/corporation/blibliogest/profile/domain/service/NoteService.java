package verslane.corporation.blibliogest.profile.domain.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import verslane.corporation.blibliogest.auth.domain.service.MyUserDetailsService;
import verslane.corporation.blibliogest.auth.persistence.model.UserEntity;
import verslane.corporation.blibliogest.profile.domain.assembler.NoteDtoAssembler;
import verslane.corporation.blibliogest.profile.facade.dto.NoteDto;
import verslane.corporation.blibliogest.profile.persistence.repository.NoteRepository;

@Service
public class NoteService {

    @Autowired 
    private NoteDtoAssembler noteDtoAssembler ;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private NoteRepository noteRepository;

    public List < NoteDto > findAllById(Authentication authenticate) {

        Optional < UserEntity > user = myUserDetailsService.findByUserName(authenticate.getName());
        List < NoteDto > noteDtos = noteDtoAssembler.fromModels(noteRepository.findByUserId(user.get().getId()));

        return noteDtos ; 
    }

}