package kr.cseungjoo.braindace_be.repository;

import kr.cseungjoo.braindace_be.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {
}
