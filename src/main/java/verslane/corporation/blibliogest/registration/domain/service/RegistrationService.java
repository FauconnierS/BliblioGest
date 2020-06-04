package verslane.corporation.blibliogest.registration.domain.service;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import verslane.corporation.blibliogest.auth.persistence.model.UserEntity;
import verslane.corporation.blibliogest.auth.persistence.repository.UserRepository;
import verslane.corporation.blibliogest.registration.domain.assembler.UserDtoAssembler;
import verslane.corporation.blibliogest.registration.facade.dto.UserDto;


@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender javaMailSender ; 

    @Autowired
    private UserDtoAssembler userDtoAssembler;

    @Autowired
    private PasswordEncoder passwordEncoder ;  


    public void newUser(UserDto userDto) {

        UserEntity newUser = new UserEntity();

        Optional < UserEntity > userOpt = userRepository.findByUserNameOrEmail(userDto.getEmail());

        if (!userOpt.isPresent()) {

            newUser = userDtoAssembler.toModel(userDto);
            newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
            newUser.setToken(generateToken());

            try {
                userRepository.save(newUser);
                sendMailRegister(newUser.getEmail(), newUser.getUserName(), newUser.getToken());

            } catch (Exception e) {
                System.out.println(e.getCause());
            }
        }

    }

    public void confirmAccount(String email , String token ){
        System.out.println(email);
        System.out.println(token);

        UserEntity confirmUser = userRepository.findByUserNameOrEmail(email).get();
        if(confirmUser != null){
            String tokenUser = confirmUser.getToken();
            if(token.equals(tokenUser)){
                confirmUser.setActive(true);
                userRepository.save(confirmUser);
            }else {
                System.out.println("Token invalid");
            }
        }else {
            System.out.println(" email : " + email + " est introuvable ");
        }

    }

    private void sendMailRegister(String email, String userName, String token) throws MessagingException , IOException{
        String text = "<h1> Bienvenue Sur BLIBLIOGEST " + userName + " </h1>";
        text += " <p> Pour valider votre inscription et pouvoir organiser votre blibliothèque personelle veuillez cliquer sur <a href='http://127.0.0.1:8080/blibliogest/registration_confirm.html?email=" + email + "&token=" + token +"'> ici</a>"  ; 


        MimeMessage msg = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(msg, true);

        helper.setTo(email);
        helper.setSubject("Enregistrement");
        helper.setText(text, true);

        javaMailSender.send(msg);
    }
    
    private String generateToken(){

        SecureRandom rand = new SecureRandom();
        byte[] token = new byte[22];
        rand.nextBytes(token);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token);
    }

}