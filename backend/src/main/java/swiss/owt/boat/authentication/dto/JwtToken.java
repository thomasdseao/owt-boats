package swiss.owt.boat.authentication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JwtToken {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("expires_at")
    private LocalDateTime expiresAt;
}