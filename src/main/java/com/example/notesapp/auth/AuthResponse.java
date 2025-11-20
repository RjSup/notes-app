package com.example.notesapp.auth;

// Response DTO for auth (signup/login)
public class AuthResponse {
    private String token;

    public AuthResponse(String token) { this.token = token; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
