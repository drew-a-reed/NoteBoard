package com.noteboard.note.dao;

import com.noteboard.note.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginDao {

    boolean login(User user);
}
