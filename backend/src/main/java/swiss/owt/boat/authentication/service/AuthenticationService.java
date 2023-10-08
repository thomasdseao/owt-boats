package swiss.owt.boat.authentication.service;

import swiss.owt.boat.authentication.request.LoginRequest;
import swiss.owt.boat.authentication.response.LoginResponse;

/**
 * Interface for authentication related operations.
 */
public interface AuthenticationService {

    /**
     * Authenticate and log in a user based on the provided request.
     *
     * @param request LoginRequest containing the email and password.
     * @return LoginResponse containing the generated JWT token.
     */
    LoginResponse login(LoginRequest request);
}
