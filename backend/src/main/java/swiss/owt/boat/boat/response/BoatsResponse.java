package swiss.owt.boat.boat.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import swiss.owt.boat.boat.dto.BoatDTO;
import swiss.owt.boat.common.response.ApiResponse;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoatsResponse extends ApiResponse<List<BoatDTO>> {
    private int status;
    private String message;
    private List<BoatDTO> data;

    public BoatsResponse(List<BoatDTO> data) {
        this.status = HttpStatus.OK.value();
        this.message = "Please find the list of your boats";
        this.data = data;
    }
}
