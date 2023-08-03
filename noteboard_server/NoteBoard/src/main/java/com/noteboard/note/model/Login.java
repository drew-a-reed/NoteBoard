package com.noteboard.note.model;

public class Login {

    private boolean authenticated;

    public Login() {
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}
