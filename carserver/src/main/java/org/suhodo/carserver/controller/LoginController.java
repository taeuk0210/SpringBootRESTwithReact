package org.suhodo.carserver.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.suhodo.carserver.domain.AccountCredentials;
import org.suhodo.carserver.service.JwtService;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final JwtService jwtService;
    // Spring security 내부에서 생성되는 로그인/인증 과정을 담당하는 객체
    private final AuthenticationManager authenticationManager;

    // 클라이언트로 부터 받는 로그인 요청
    @PostMapping("login")
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
        /*
        *  AuthenticationManager가 인증과정에서 사용하는 객체(Username~Token)에
        * 클라이언트가 전송한 username / password를 저장
        * */
        UsernamePasswordAuthenticationToken creds =
                new UsernamePasswordAuthenticationToken(
                        credentials.getUsername(),
                        credentials.getPassword());
        /*
        * 아래 메소드가 호출되는 과정에서 UserDetailsServiceImpl에 override 한
        * loadUserByUsername이 호출되어 username을 가진 사용자가 DB에 존재하는지
        * 확인 후 내부적으로 로그인 처리함
        * */
        Authentication auth = authenticationManager.authenticate(creds);

        // Token 발급
        String jwts = jwtService.getToken(auth.getName());

        // 클라이언트에 전송할 AUTHORIZATION 헤더에 토큰을 넣어서 전달
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .build();
    }

}
