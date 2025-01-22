package dev.luizhcgoncalves.book_network.role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.luizhcgoncalves.book_network.common.BaseEntity;
import dev.luizhcgoncalves.book_network.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "TB_ROLE")
public class Role extends BaseEntity {
    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private List<User> users;
}
