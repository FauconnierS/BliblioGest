package verslane.corporation.blibliogest.profile.domain.assembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import verslane.corporation.blibliogest.auth.persistence.model.UserEntity;
import verslane.corporation.blibliogest.profile.facade.dto.NoteDto;
import verslane.corporation.blibliogest.profile.persistence.model.NoteEntity;

@Component
public class NoteDtoAssembler {


    public List <NoteDto> fromModels (List<NoteEntity> notes){
        List <NoteDto> noteDtos = new ArrayList<>(); 
        for(NoteEntity note : notes){
            noteDtos.add(fromModel(note));
        }
        return noteDtos ; 

    }

    public NoteDto fromModel (NoteEntity note) {

        NoteDto noteDto = new NoteDto();
        noteDto.setId(note.getId());
        noteDto.setBook(note.getBook());
        noteDto.setChapter(note.getChapter());
        noteDto.setPage(note.getPage());
        noteDto.setCommentary(note.getComentary());
        noteDto.setUser(note.getUser().getId());

        return noteDto ; 

    }

    public NoteEntity toModel (NoteDto noteDto, UserEntity user) {

        NoteEntity note = new NoteEntity();
        note.setId(noteDto.getId());
        note.setBook(noteDto.getBook());
        note.setChapter(noteDto.getChapter());
        note.setPage(noteDto.getPage());
        note.setComentary(noteDto.getCommentary());
        note.setUser(user);
        return note ; 
    }
    


}