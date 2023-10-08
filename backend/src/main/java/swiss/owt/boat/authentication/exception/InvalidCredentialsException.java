package swiss.owt.boat.authentication.exception;

import org.springframework.http.HttpStatus;
import swiss.owt.boat.common.exception.BaseException;

public class InvalidCredentialsException extends BaseException {
    public InvalidCredentialsException() {
        super(
                "Invalid credentials, please try again.",
                HttpStatus.UNAUTHORIZED
        );
    }
}
