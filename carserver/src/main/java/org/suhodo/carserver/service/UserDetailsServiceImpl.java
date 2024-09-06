package org.suhodo.carserver.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.stereotype.Service;
import org.suhodo.carserver.domain.User;
import org.suhodo.carserver.repository.UserRepository;

import java.util.Optional;

/*
 * Spring Security의 인증 과정에서 호출되어 진다
 * 사용자의 이름을 username으로 전달 받아 loadUserByUsername 의 매개변수로 잔달받는다
 * 이곳에는 DBMS 의 User테이블에 username을 가진 사용자가 있는지 조회하여
 * 존재하지 않으면 예외처리를 하고 존재하면 UserDetails 객체를 리턴한다.
 * */
@Service
@Log4j2
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Loading user by username: " + username);
        Optional<User> user = userRepository.findByUsername(username);
        UserBuilder builder = null;

        if (user.isPresent()) {
            User currentUser = user.get();
            builder = org.springframework.security.core.userdetails.User.withUsername(username);
            builder.password(currentUser.getPassword());
            builder.roles(currentUser.getRole());
        } else {
            throw new UsernameNotFoundException("USER Not Found : " + username);
        }
        return builder.build();
    }
}
