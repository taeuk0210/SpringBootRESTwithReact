package org.suhodo.carserver.domain;


import lombok.Data;

/*
* 클라이언트가 전송하는 username/password 를 저장하기 위한 클래스
* 인증과정에 필요한 클래스이고 따로 DB에 저장하지는 않음
* */
@Data
public class AccountCredentials {
    private String username;
    private String password;
}
