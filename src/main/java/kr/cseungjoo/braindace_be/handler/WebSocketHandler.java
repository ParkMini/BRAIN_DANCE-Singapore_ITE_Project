package kr.cseungjoo.braindace_be.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.SocketException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {
    private Map<UUID, Map<String, WebSocketSession>> gameSocketMap = new HashMap<>();
    private List<String> slave1List = new ArrayList<>();
    private List<String> slave2List = new ArrayList<>();
    private boolean gameStart = false;
    private long userId = 0;

    private UUID key = UUID.randomUUID();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        String gameId = extractGameId(session);
        String type = extractType(session);
//        if (gameId == null)
//            throw new SocketException("gameId is null");
//
//        UUID gameUUID = UUID.fromString(gameId);

        gameSocketMap.computeIfAbsent(key, k -> new HashMap<>());
        gameSocketMap.get(key).put(type, session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if (!gameStart)
            return;

        String type = extractType(session);
        if (type == "0")
            slave1List.add(message.getPayload());
        else
            slave2List.add(message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
    }

    public void gameStart(long userId) {
        gameStart = true;
        userId = userId;
    }

    public int gameEnd() {
        gameStart = false;

        return (int) (Math.random() * 100 + 1);
    }

    private String extractGameId(WebSocketSession session) {
        String query = session.getUri().getQuery();
        String[] param = query.split("&");

        for (String s : param) {
            String[] keyValue = s.split("=");
            if (keyValue.length == 2 && keyValue[0].equals("gameId")) {
                return keyValue[1];
            }
        }
        return null;
    }

    private String extractType(WebSocketSession session) {
        String query = session.getUri().getQuery();
        String[] param = query.split("&");

        for (String s : param) {
            String[] keyValue = s.split("=");
            if (keyValue.length == 2 && keyValue[0].equals("type")) {
                return keyValue[1];
            }
        }
        return null;
    }
}