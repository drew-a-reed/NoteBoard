package com.noteboard.note.dao;

import com.noteboard.note.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcUserDao implements UserDao {

    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    public JdbcUserDao(DataSource ds, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = new JdbcTemplate(ds);
        this.passwordEncoder = passwordEncoder;
    }


    private User userObjectMapper(SqlRowSet results) {
        User user = new User();
        user.setUserId(results.getInt("user_id"));
        user.setUsername(results.getString("username"));
        user.setPassword(results.getString("password"));
        user.setActivated(results.getBoolean("active"));
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        String sql = "SELECT * FROM users";
        SqlRowSet results = this.jdbcTemplate.queryForRowSet(sql);
        List<User> users = new ArrayList<>();
        while (results.next()) {
            users.add(userObjectMapper(results));
        }
        return users;
    }

    @Override
    public User getUserById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = ?";
        SqlRowSet results = this.jdbcTemplate.queryForRowSet(sql, userId);
        if (results.next()) {
            return userObjectMapper(results);
        }
        return null;
    }

    @Override
    public User getUserByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        SqlRowSet results = this.jdbcTemplate.queryForRowSet(sql, username);
        if (results.next()) {
            return userObjectMapper(results);
        }
        return null;
    }

    @Override
    public int getIdByUsername(String username) {
        String sql = "SELECT user_id FROM users WHERE username = ?";
        return this.jdbcTemplate.queryForObject(sql, Integer.class, username);
    }

    @Override
    public boolean createUser(User user) {
        String username = user.getUsername();
        String plainPassword = user.getPassword();

        String encodedPassword = passwordEncoder.encode(plainPassword);

        if (username == null) {
            throw new IllegalArgumentException("Username must not be null");
        }

        if (plainPassword == null) {
            throw new IllegalArgumentException("Password must not be null");
        }

        String sql = "INSERT INTO users (username, password, active) VALUES (?, ?, true)";
        jdbcTemplate.update(sql, username, encodedPassword);

        return true;
    }

}