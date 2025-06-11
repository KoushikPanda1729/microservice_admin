import type { LoginUserDTO } from "../dtos/LoginUserDTO";

export class LoginModelMapper {
  static toLoginDTO(gmail: string, password: string): LoginUserDTO {
    return {
      gmail,
      password,
    };
  }
}
