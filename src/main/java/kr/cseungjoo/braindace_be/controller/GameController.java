package kr.cseungjoo.braindace_be.controller;

import kr.cseungjoo.braindace_be.domain.User;
import kr.cseungjoo.braindace_be.handler.WebSocketHandler;
import kr.cseungjoo.braindace_be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Transactional
public class GameController {

    private final WebSocketHandler webSocketHandler;
    private final UserRepository userRepository;

    @PostMapping("/start")
    public ResponseEntity<?> gameStart(@ModelAttribute User user) {
        User save = userRepository.save(user);
        userRepository.flush();
        webSocketHandler.gameStart(save.getId());
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/end")
    public ResponseEntity<?> gameEnd() {
        int score = webSocketHandler.gameEnd();
        return ResponseEntity.ok(score);
    }
}
