package org.suhodo.carserver.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "cars")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ownerId;

    private String firstName;
    private String lastName;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,
                fetch = FetchType.LAZY,
                orphanRemoval = true,
                mappedBy = "owner") // mappedBy는 하위 entity(Car) 에서 연결되는 필드를 입력
    private List<Car> cars;
}
