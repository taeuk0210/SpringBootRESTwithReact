package org.suhodo.carserver.filter;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.suhodo.carserver.service.JwtService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
* "/login" 엔드포인트를 제외한 나머지 엔드포인트 요청은 모두 이곳에서 검증
* 제대로된 JWT token 인지 아닌지를 검증해야 함
* 검증 과정
* 1. token 이 있는지 여부
* 2. token 이 정상인지
* 3. token 이 정상이면 요청을 DispatcherServlet으로 전달
* */
@Component
@RequiredArgsConstructor
@Log4j2
public class AuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 1. 토큰 존재 여부 확인
        // String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION); 아래랑 똑같은 동작
        String jwtToken = request.getHeader("Authorization");
        log.info("///////////////////USER JWT TOKEN : " + jwtToken);
        if (jwtToken != null) {
            // 2. 토큰이 정상인지 확인
            // 토큰을 비밀키로 복호화 후 username 추출
            String username = jwtService.getAuthUser(request);
            Authentication auth =
                    new UsernamePasswordAuthenticationToken(
                            username, null, java.util.Collections.emptyList());
            // security context에 저장하여 서버는 인증 정보를 가지게 됨
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        // 3. DispatcherServlet 으로 전달
        filterChain.doFilter(request, response);

    }
}
