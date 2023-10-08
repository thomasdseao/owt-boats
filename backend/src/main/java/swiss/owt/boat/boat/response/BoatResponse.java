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
public class BoatResponse extends ApiResponse<BoatDTO> {
    private int status;
    private String message;
    private BoatDTO data;

    public BoatResponse(BoatDTO data) {
        this.status = HttpStatus.OK.value();
        this.message = "Please find your boat details";
        this.data = data;
    }
}