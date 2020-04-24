package verslane.corporation.blibliogest.citation.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import verslane.corporation.blibliogest.book.domain.service.AuthorService;
import verslane.corporation.blibliogest.book.persistence.model.AuthorEntity;
import verslane.corporation.blibliogest.citation.domain.assembler.CitationDtoAssembler;
import verslane.corporation.blibliogest.citation.facade.dto.CitationDto;
import verslane.corporation.blibliogest.citation.persistence.model.CitationEntity;
import verslane.corporation.blibliogest.citation.persistence.repository.CitationRepository;

@Service
public class CitationService {

    @Autowired
    private CitationRepository citationRepository;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private CitationDtoAssembler citationDtoAssembler;

    public List < CitationDto > findAll() {
        return citationDtoAssembler.fromModels(citationRepository.findAll());
    }

    public CitationDto findOne(Long id) {
        return citationDtoAssembler.fromModel(citationRepository.getOne(id));
    }

    public Optional < CitationEntity > findByid(Long id) {
        return citationRepository.findById(id);

    }

    public List<CitationEntity> findByAuthorId(Long id ){
        return citationRepository.findByAuthorId(id);
    }
    public void create(CitationDto citationDto) {
        if (!authorService.exist(citationDto.getAuthor())) {
            authorService.create(citationDto.getAuthor());
        }

        CitationEntity newCitation = new CitationEntity();
        AuthorEntity author = authorService.findByName(citationDto.getAuthor()).get();
        newCitation = citationDtoAssembler.toModel(citationDto, author);

        try {
            citationRepository.save(newCitation);
        } catch (Exception e) {
            System.out.println(e.getCause() + " Erreur lors de la sauvegarde de la nouvelle citation ");
        }
    }

    public void update(Long id, CitationDto citationDto) {

        Optional <CitationEntity> citationOpt = findByid(id);
        if(citationOpt.isPresent()){
            if(!authorService.exist(citationDto.getAuthor())){
                authorService.create(citationDto.getAuthor());
            }
            AuthorEntity author = authorService.findByName(citationDto.getAuthor()).get();
            CitationEntity citationUpdate = citationDtoAssembler.toModel(citationDto, author); 

            try {
                citationRepository.save(citationUpdate); 
            } catch (Exception e) {
                System.out.println(e.getCause() + " Problème d'enregistrement des mofifications ") ; 
            }
        }else
        System.out.println("La citation à modifier n'existe pas !");
    }

    public void delete(CitationDto citationDto){
        Optional<CitationEntity> citationOpt = findByid(citationDto.getId());

        if(citationOpt.isPresent()){
            citationRepository.delete(citationOpt.get());
        }

        authorService.verifyBookOrCitationExistByAuthor(authorService.findByName(citationDto.getAuthor()).get());
    }

}