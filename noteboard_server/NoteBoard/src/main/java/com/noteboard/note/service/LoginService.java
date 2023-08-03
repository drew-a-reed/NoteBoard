package com.noteboard.note.service;

        import com.noteboard.note.dao.UserDao;
        import com.noteboard.note.model.User;
        import org.springframework.security.crypto.password.PasswordEncoder;
        import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userDao = userDao;
    }

    public boolean authenticate(String username, String password) {
        User user = userDao.getUserByUsername(username);
        if (user != null) {
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }
}
