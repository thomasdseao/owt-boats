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
public class DeleteBoatResponse extends ApiResponse<Object> {
    @Builder.Default
    private int status = HttpStatus.NO_CONTENT.value();
    @Builder.Default
    private String message = "Your boat has been deleted";

}