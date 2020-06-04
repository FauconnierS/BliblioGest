package verslane.corporation.blibliogest.registration.domain.assembler;

import org.springframework.stereotype.Component;

import verslane.corporation.blibliogest.auth.persistence.model.UserEntity;
import verslane.corporation.blibliogest.registration.facade.dto.UserDto;

@Component
public class UserDtoAssembler {

    public UserEntity toModel (UserDto userDto)
    {
        UserEntity user = new UserEntity();

        user.setUserName(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setActive(false);
        user.setRoles("ROLE_USER");

        return user ; 
    } 
    
}