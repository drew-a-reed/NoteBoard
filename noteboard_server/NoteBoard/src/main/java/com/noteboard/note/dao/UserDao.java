package com.noteboard.note.dao;

import com.noteboard.note.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {

    List<User> getAllUsers();

    User getUserById(int userId);

    User getUserByUsername(String username);

    int getIdByUsername(String username);

    boolean createUser(User user);
}
