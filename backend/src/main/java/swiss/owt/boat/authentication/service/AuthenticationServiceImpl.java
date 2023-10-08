package swiss.owt.boat.authentication.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import swiss.owt.boat.authentication.exception.InvalidCredentialsException;
import swiss.owt.boat.authentication.request.LoginRequest;
import swiss.owt.boat.authentication.dto.JwtToken;
import swiss.owt.boat.authentication.response.LoginResponse;
import swiss.owt.boat.user.repository.UserRepository;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Constructor to inject dependencies.
     *
     * @param userRepository          The repository to manage User-related data operations.
     * @param jwtService              The service to handle JWT token operations.
     * @param authenticationManager   The manager to handle authentication operations.
     */
    public AuthenticationServiceImpl(UserRepository userRepository, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Authenticate and log in a user based on the provided request.
     *
     * @param request LoginRequest containing the email and password.
     * @return LoginResponse containing the generated JWT token.
     * @throws InvalidCredentialsException if the authentication process fails.
     */
    public LoginResponse login(LoginRequest request) {
        try {
            // Attempt to authenticate the user.
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            // Throw an exception if authentication fails.
            throw new InvalidCredentialsException();
        }

        // Retrieve the user by their email.
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(InvalidCredentialsException::new);

        // Generate a JWT token for the authenticated user.
        JwtToken jwtResponse = jwtService.buildToken(user);

        // Return the LoginResponse containing the JWT token.
        return new LoginResponse(jwtResponse);
    }
}