package swiss.owt.boat.boat.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import swiss.owt.boat.boat.dto.BoatDTO;
import swiss.owt.boat.common.response.ApiResponse;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateBoatResponse extends ApiResponse<BoatDTO> {
    private int status;
    private String message;
    private BoatDTO data;

    public UpdateBoatResponse(BoatDTO data) {
        this.status = HttpStatus.OK.value();
        this.message = "Your boat has been successfully updated";
        this.data = data;
    }
}