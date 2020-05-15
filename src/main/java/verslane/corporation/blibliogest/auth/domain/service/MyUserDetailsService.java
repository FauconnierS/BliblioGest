package verslane.corporation.blibliogest.auth.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import verslane.corporation.blibliogest.auth.persistence.model.UserEntity;
import verslane.corporation.blibliogest.auth.persistence.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        
        Optional <UserEntity> user = userRepository.findByUserNameOrEmail(userName);

        user.orElseThrow(() -> new UsernameNotFoundException(userName + "introuvable."));
        return user.map(MyUserDetails :: new).get();
    }

    public Optional <UserEntity> findByUserName(String userName) {
       return userRepository.findByUserNameOrEmail(userName);
    } 

    


    
}