package kr.cseungjoo.braindace_be.config;

import kr.cseungjoo.braindace_be.handler.WebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler handlerManager;

    public WebSocketConfig(WebSocketHandler handlerManager) {
        this.handlerManager = handlerManager;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // Map에서 핸들러를 가져와 등록
        registry.addHandler(handlerManager, "/ws")
                .setAllowedOrigins("*");
    }
}