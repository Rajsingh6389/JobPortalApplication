package jobportalapplication.jobportalapplication.dto;

// SignupRequest.java
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    private String name;
    private String email;
    private String password;
}