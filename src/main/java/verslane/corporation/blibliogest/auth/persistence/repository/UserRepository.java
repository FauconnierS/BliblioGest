package verslane.corporation.blibliogest.auth.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import verslane.corporation.blibliogest.auth.persistence.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository < UserEntity, Long > {

    @Query("select u from UserEntity u where u.email = :userNameOrEmail OR u.userName = :userNameOrEmail")
    Optional<UserEntity> findByUserNameOrEmail (@Param("userNameOrEmail") String userName);
}