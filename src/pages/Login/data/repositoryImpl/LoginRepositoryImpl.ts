import type { LoginEntity } from "../../domain/entities/LoginEntity";
import type { LoginRepository } from "../../domain/repository/LoginRepository";
import type { LoginApiDatasource } from "../datasource/LoginApiDatasource";
import { LoginModelMapper } from "../mappers/LoginModelMapper";

export class LoginRepositoryImpl implements LoginRepository {
  private readonly dataSource: LoginApiDatasource;

  constructor(dataSource: LoginApiDatasource) {
    this.dataSource = dataSource;
  }

  async loginUser(gmail: string, password: string): Promise<LoginEntity> {
    const dto = LoginModelMapper.toLoginDTO(gmail, password);
    const loginModel = await this.dataSource.loginUser(dto);
    return loginModel.toEntity();
  }
}
