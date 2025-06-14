import {
  setLoading,
  setGmail,
  setPassword,
  setRememberMe,
  setError,
} from "./page.slice";
import type { AppDispatch, RootState } from "@/app/store/store";
import type { LoginUserUseCase } from "../domain/usecases/LoginUserUseCase";

export class LoginPageViewModel {
  private readonly dispatch: AppDispatch;
  private readonly getState;
  private readonly loginUserUseCase: LoginUserUseCase;
  constructor(
    dispatch: AppDispatch,
    getState: () => RootState,
    loginUserUseCase: LoginUserUseCase
  ) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.loginUserUseCase = loginUserUseCase;
  }

  initialize() {}

  updateGmail(value: string) {
    this.dispatch(setGmail(value));
  }

  updatePassword(value: string) {
    this.dispatch(setPassword(value));
  }

  updateRememberMe(value: boolean) {
    this.dispatch(setRememberMe(value));
  }

  get gmail() {
    return this.getState().LoginPageReducerSlice.gmail;
  }

  get password() {
    return this.getState().LoginPageReducerSlice.password;
  }

  get rememberMe() {
    return this.getState().LoginPageReducerSlice.rememberMe;
  }

  get error() {
    return this.getState().LoginPageReducerSlice.error;
  }

  async loginUser(
    redirectPath: string,
    navigate: (to: string, options?: Record<string, unknown>) => void
  ) {
    if (!this.gmail) {
      this.dispatch(setError("Phone number is required"));
      return;
    }

    if (!this.password) {
      this.dispatch(setError("Password is required"));
      return;
    }

    try {
      this.dispatch(setLoading(true));
      await this.loginUserUseCase.execute(this.gmail, this.password);
      navigate(redirectPath, { replace: true });
    } catch {
      this.dispatch(setError("Invalid credentials. Please try again."));
    } finally {
      this.dispatch(setLoading(false));
    }
  }
}
