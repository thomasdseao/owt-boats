package swiss.owt.boat.boat.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import swiss.owt.boat.user.model.User;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "boat")
public class Boat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
