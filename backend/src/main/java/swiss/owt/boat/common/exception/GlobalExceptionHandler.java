package swiss.owt.boat.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import swiss.owt.boat.common.response.ApiResponse;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;


@ControllerAdvice
public class GlobalExceptionHandler {
    private ResponseEntity<ApiResponse<Void>> createNoDataResponse(String message, HttpStatus status) {
        ApiResponse<Void> error = new ApiResponse<>();

        error.setStatus(status.value());
        error.setMessage(message);

        return new ResponseEntity<>(error, status);
    }

    private <T> ResponseEntity<ApiResponse<T>> createDataResponse(String message, HttpStatus status, T data) {
        ApiResponse<T> response = new ApiResponse<>();

        response.setStatus(status.value());
        response.setMessage(message);
        response.setData(data);

        return new ResponseEntity<>(response, status);
    }


    @ExceptionHandler
    public ResponseEntity<ApiResponse<Void>> handleException(BaseException ex) {
        return this.createNoDataResponse(ex.getMessage(), ex.getHttpStatus());
    }

    @ExceptionHandler(HttpClientErrorException.NotFound.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFoundException(NoSuchElementException ex) {
        return createNoDataResponse("Resource not found", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Void>> handleAccessDeniedException(AccessDeniedException ex) {
        return createNoDataResponse("Access denied", HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<ApiResponse<Void>> handleAuthenticationException(AuthenticationException ex) {
        return createNoDataResponse("Unauthorized", HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return createDataResponse("Invalid parameters, please check again", HttpStatus.BAD_REQUEST, errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception ex) {
        // Log exception for debugging purposes
        return createNoDataResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
