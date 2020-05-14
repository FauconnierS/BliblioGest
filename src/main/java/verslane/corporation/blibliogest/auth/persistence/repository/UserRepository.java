package verslane.corporation.blibliogest.auth.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import verslane.corporation.blibliogest.auth.persistence.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository < UserEntity, Long > {

    Optional<UserEntity> findByUserName (String userName);
}