package verslane.corporation.blibliogest.citation.facade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import verslane.corporation.blibliogest.citation.domain.service.CitationService;
import verslane.corporation.blibliogest.citation.facade.dto.CitationDto;

@RestController
@RequestMapping("/citation")
public class CitationController {

    @Autowired
    private CitationService citationService;

    @GetMapping("/")
    public List < CitationDto > findAllCitation() {

        return citationService.findAll();
    }

    @GetMapping("/{citationId}")
    public CitationDto findOneCitation(@PathVariable("citationId") Long id) {
        return citationService.findOne(id);
    }

    @PostMapping("/create")
    public void createCitation(@RequestBody CitationDto citationDto) {
        citationService.create(citationDto);
    }

    @PostMapping("/update")
    public void updateCitation(@RequestBody CitationDto citationDto) {
        citationService.update(citationDto.getId(), citationDto);
    }

    @PostMapping("/delete")
    public void deleteCitation(@RequestBody CitationDto citationDto) {
        citationService.delete(citationDto.getId());
    }
}