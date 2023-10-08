package swiss.owt.boat.authentication.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;
import swiss.owt.boat.authentication.dto.JwtToken;
import swiss.owt.boat.common.response.ApiResponse;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse extends ApiResponse<JwtToken> {
    @Builder.Default
    private int status = HttpStatus.OK.value();
    @Builder.Default
    private String message = "Successfully logged in";
    private JwtToken data;

    public LoginResponse(JwtToken data) {
        this.data = data;
    }
}