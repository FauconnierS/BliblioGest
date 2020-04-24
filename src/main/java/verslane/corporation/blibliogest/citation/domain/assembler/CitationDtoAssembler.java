package verslane.corporation.blibliogest.citation.domain.assembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;
import verslane.corporation.blibliogest.citation.facade.dto.CitationDto;
import verslane.corporation.blibliogest.citation.persistence.model.CitationEntity;

@Component
public class CitationDtoAssembler {

    public List<CitationDto> fromModels (List <CitationEntity> citations){
        List<CitationDto> citationsDto = new ArrayList<>();
        for(CitationEntity citation : citations){
            citationsDto.add(fromModel(citation));
        }
        return citationsDto ;
    }

    public CitationDto fromModel (CitationEntity citationEntity){
        CitationDto citationDto = new CitationDto();
        citationDto.setId(citationEntity.getId()); 
        citationDto.setText(citationEntity.getText()); 
        citationDto.setAuthor(citationEntity.getAuthor().getName());
        
        return citationDto ;
    }

    public CitationEntity toModel(CitationDto citationDto, AuthorEntity author){
        CitationEntity citation = new CitationEntity(); 
        citation.setId(citationDto.getId());
        citation.setText(citationDto.getText());
        citation.setAuthor(author);
        
        return citation; 
    }

}