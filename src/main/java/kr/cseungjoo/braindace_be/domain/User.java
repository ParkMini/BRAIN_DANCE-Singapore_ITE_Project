package kr.cseungjoo.braindace_be.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String schoolName;

    @Column
    private String birth;

    @Column
    private String phone;

    @Column
    private boolean gender;

    @OneToOne
    @JoinColumn(name = "game_rank_id")
    private GameRank gameRank;
}
