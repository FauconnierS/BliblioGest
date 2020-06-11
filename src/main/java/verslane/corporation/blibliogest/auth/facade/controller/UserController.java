package verslane.corporation.blibliogest.auth.facade.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/current-user")
public class UserController {


    @GetMapping("/")
    public String isConnected(Principal principal) {
            if(principal != null){
                return principal.getName();
            }
            return "Anonymous";
        }
    }