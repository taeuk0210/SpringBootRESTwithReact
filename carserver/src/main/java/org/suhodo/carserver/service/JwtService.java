package org.suhodo.carserver.service;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;


// 사용자 인증을 위한 JWT Service 클래스
@Component
public class JwtService {

    /*
    * 토큰을 발급할 때 필요한 정보
    * EXPIRATION_TIME : 토큰의 유효시간, 1일로 설정
    * PREFIX : JWT 토큰 앞에 붙이는 접두사, JWT 앞에는 관습적으로 Bearer 를 붙임
    * KEY : 토큰의 발행 / 검증 시 사용하는 비밀키
    * */
    static final long EXPIRATION_TIME = 60 * 60 * 24 * 1;
    static final String PREFIX = "Bearer";
    static final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // 토큰 발급 메소드
    public String getToken(String username) {
        String token = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(KEY)
                .compact();
        return token;
    }

    // 클라이언트가 보내온 토큰에서 username을 추출하는 메소드
    public String getAuthUser(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        // 토큰이 헤더에 존재하면 유저를 추출
        if (token != null) {
            String user = Jwts.parserBuilder()
                    .setSigningKey(KEY)
                    .build()
                    .parseClaimsJws(token.replace(PREFIX, ""))
                    .getBody()
                    .getSubject();
            if (user != null) {
                return user;
            }
        }
        return null;
    }
}
