package swiss.owt.boat.authentication.service;

import org.springframework.security.core.userdetails.UserDetails;
import swiss.owt.boat.authentication.dto.JwtToken;

import java.util.Date;

public interface JwtService {

    /**
     * Extract username from JWT token.
     *
     * @param token JWT token
     * @return Extracted username
     */
    String extractUsername(String token);

    /**
     * Build JWT token for authenticated user.
     *
     * @param userDetails User details
     * @return Built JWT token
     */
    JwtToken buildToken(UserDetails userDetails);

    /**
     * Validate the JWT token.
     *
     * @param token       JWT token
     * @param userDetails User details
     * @return Whether the token is valid or not
     */
    boolean isTokenValid(String token, UserDetails userDetails);
}
