package swiss.owt.boat.common.exception;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends BaseException {
    public ResourceNotFoundException(String message) {
        super(
                message,
                HttpStatus.NOT_FOUND
        );
    }
}
