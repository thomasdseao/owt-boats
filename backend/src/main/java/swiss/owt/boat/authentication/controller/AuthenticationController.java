package swiss.owt.boat.authentication.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swiss.owt.boat.authentication.request.LoginRequest;
import swiss.owt.boat.authentication.response.LoginResponse;
import swiss.owt.boat.authentication.service.AuthenticationService;

@RestController
@RequestMapping("/api/v1/authentication")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    /**
     * Constructs a new AuthenticationController with a specified AuthenticationService.
     *
     * @param authenticationService the authentication service to use for login logic
     */
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * Handles user login.
     *
     * @param loginRequest the login request containing user credentials
     * @return a LoginResponse containing the JWT token
     */
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }
}