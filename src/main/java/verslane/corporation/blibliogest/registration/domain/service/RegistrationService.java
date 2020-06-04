package verslane.corporation.blibliogest.registration.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private UserDtoAssembler userDtoAssembler;

    @Autowired
    private PasswordEncoder passwordEncoder ;  


    public void newUser(UserDto userDto) {

        UserEntity newUser = new UserEntity();

        Optional < UserEntity > userOpt = userRepository.findByUserNameOrEmail(userDto.getEmail());

        if (!userOpt.isPresent()) {

            newUser = userDtoAssembler.toModel(userDto);
            newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));

            try {
                userRepository.save(newUser);
            } catch (Exception e) {
                System.out.println(e.getCause());
            }
        }

    }

}