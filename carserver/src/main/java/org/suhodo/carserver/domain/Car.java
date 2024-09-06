package org.suhodo.carserver.domain;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "owner")
public class Car {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;
    private String color;
    private String registerNumber;

    private Integer year;
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ownerId") // FK 이름을 직접 지정
    private Owner owner;
}
