package backend.shoppetproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @OneToOne(mappedBy = "user")
    private BasketEntity basket;


    public UserEntity() {
    }

    public UserEntity(Long id,
                      String firstName,
                      String lastName,
                      String passwordHash,
                      String email,
                      BasketEntity basketEntity) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = passwordHash;
        this.email = email;
        this.basket = basketEntity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String passwordHash) {
        this.password = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BasketEntity getBasketEntity() {
        return basket;
    }

    public void setBasketEntity(BasketEntity basketEntity) {
        this.basket = basketEntity;
    }
}

