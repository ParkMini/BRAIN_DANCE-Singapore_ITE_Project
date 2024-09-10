package kr.cseungjoo.braindace_be.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class GameRank {
    @Id @GeneratedValue
    private Long id;

    @Column
    private Integer score;

    @Column
    private LocalDateTime time;

}
