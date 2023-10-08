package swiss.owt.boat.boat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoatDTO {
    private Long id;
    private String name;
    private String description;
}
