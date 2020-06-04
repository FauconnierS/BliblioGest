package verslane.corporation.blibliogest.registration.facade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import verslane.corporation.blibliogest.registration.domain.service.RegistrationService;
import verslane.corporation.blibliogest.registration.facade.dto.UserDto;

@RestController
@RequestMapping("/register")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;
    
    @PostMapping("/")
    public void newRegister(@RequestBody UserDto userDto){
        registrationService.newUser(userDto);
    }
    
}