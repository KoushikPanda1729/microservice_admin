import type { RootState } from "@/app/store/store";
import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { useMemo } from "react";
import { useDispatch, useStore } from "react-redux";
import { LoginApiDatasource } from "../data/datasource/LoginApiDatasource";
import { LoginRepositoryImpl } from "../data/repositoryImpl/LoginRepositoryImpl";
import { LoginUserUseCase } from "../domain/usecases/LoginUserUseCase";
import { LoginPageViewModel } from "./page.viewmodel";

export const useLoginPageViewModel = (): LoginPageViewModel => {
  const dispatch = useDispatch();
  const store = useStore<RootState>();

  return useMemo(() => {
    const authService = new AuthService();
    const axiosClient = new AxiosClient(authService);
    const dataSource = new LoginApiDatasource(axiosClient);
    const repository = new LoginRepositoryImpl(dataSource);
    const loginUserUseCase = new LoginUserUseCase(repository);

    return new LoginPageViewModel(dispatch, store.getState, loginUserUseCase);
  }, [dispatch, store.getState]);
};
