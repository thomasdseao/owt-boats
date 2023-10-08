package swiss.owt.boat.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import swiss.owt.boat.common.exception.ResourceNotFoundException;
import swiss.owt.boat.user.model.User;
import swiss.owt.boat.user.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    private final UserRepository userRepository;

    /**
     * Constructs a UserService with a UserRepository for user lookups.
     *
     * @param userRepository the repository containing user information
     */
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads a user by their email.
     *
     * @param email the email to search for
     * @return UserDetails object with user information
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), Collections.emptyList());
    }

    /**
     * Finds a user by their email.
     *
     * @param email the email to search for
     * @return a User object
     * @throws ResourceNotFoundException if the user is not found
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email " + email));
    }

    /**
     * Retrieves the currently authenticated user.
     *
     * @return the current User object
     * @throws IllegalStateException if the current user is not found
     */
    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userRepository.findByEmail(username)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with email " + username));
        } else {
            throw new IllegalStateException("Current user not found");
        }
    }
}