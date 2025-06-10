import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginComponent from "../../pages/Login/presentation/components/LoginComponent/LoginComponent";

const mockLoginUser = vi.fn();
const mockInitialize = vi.fn();
const mockUpdatePhone = vi.fn();
const mockUpdatePassword = vi.fn();
const mockUpdateRememberMe = vi.fn();

vi.mock("../../pages/Login/presentation/page.di", () => ({
  useLoginPageViewModel: () => ({
    phone: "1234567890",
    password: "password123",
    rememberMe: false,
    error: null,
    loginUser: mockLoginUser,
    initialize: mockInitialize,
    updatePhone: mockUpdatePhone,
    updatePassword: mockUpdatePassword,
    updateRememberMe: mockUpdateRememberMe,
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams()],
  };
});

vi.mock("@/commons/hooks/useAuth", () => ({
  useAuth: () => ({ isAuthenticated: false }),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      LoginPageReducerSlice: (state = { isLoading: false }, action) => {
        switch (action.type) {
          case "SET_LOADING":
            return { ...state, isLoading: action.payload };
          default:
            return { ...state, ...initialState };
        }
      },
    },
  });
};

const renderWithProvider = (component: ReactElement, initialState = {}) => {
  const store = createMockStore(initialState);
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("LoginComponent (Custom Inputs & ViewModel)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input placeholders", () => {
    renderWithProvider(<LoginComponent />);
    expect(
      screen.getByPlaceholderText("Enter your phone number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });

  it("updates phone input triggers updatePhone", async () => {
    const user = userEvent.setup();
    renderWithProvider(<LoginComponent />);
    const phoneInput = screen.getByLabelText("Phone Number");

    await user.type(phoneInput, "123");
    expect(mockUpdatePhone).toHaveBeenCalled();
  });

  it("updates password input triggers updatePassword", async () => {
    const user = userEvent.setup();
    renderWithProvider(<LoginComponent />);
    const passwordInput = screen.getByLabelText("Password");

    await user.type(passwordInput, "secret");
    expect(mockUpdatePassword).toHaveBeenCalled();
  });

  it("submits the form and calls loginUser", async () => {
    const user = userEvent.setup();
    renderWithProvider(<LoginComponent />);
    const submitButton = screen.getByRole("button", { name: "Log In" });

    await user.click(submitButton);
    expect(mockLoginUser).toHaveBeenCalled();
  });

  it("shows loading spinner and disables button when loading", () => {
    renderWithProvider(<LoginComponent />, { isLoading: true });

    const button = screen.getByRole("button", { name: /signing in/i });
    expect(button).toBeDisabled();
    const spinner = button.querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  it("displays error message when error is set", () => {
    vi.mock("../../pages/Login/presentation/page.di", () => ({
      useLoginPageViewModel: () => ({
        phone: "123",
        password: "pass",
        rememberMe: false,
        error: "Invalid credentials. Please try again.",
        loginUser: mockLoginUser,
        initialize: mockInitialize,
        updatePhone: mockUpdatePhone,
        updatePassword: mockUpdatePassword,
        updateRememberMe: mockUpdateRememberMe,
      }),
    }));

    renderWithProvider(<LoginComponent />);
    const errorMessage = screen.getByText(
      "Invalid credentials. Please try again."
    );
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.closest(".bg-red-50")).toHaveClass(
      "border-l-4",
      "border-red-400"
    );
  });

  it("toggles remember me checkbox and calls updateRememberMe", async () => {
    const user = userEvent.setup();
    renderWithProvider(<LoginComponent />);

    const checkbox = screen.getByLabelText("Remember Me");
    await user.click(checkbox);
    expect(mockUpdateRememberMe).toHaveBeenCalledWith(true);
  });

  it("redirects if user is authenticated", () => {
    vi.mock("@/commons/hooks/useAuth", () => ({
      useAuth: () => ({ isAuthenticated: true }),
    }));

    renderWithProvider(<LoginComponent />);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
  });
});
