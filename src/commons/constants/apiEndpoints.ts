export interface ApiEndpoint {
  path: string;
  requiresAuth: boolean;
}

export const ApiEndpoints: Record<string, ApiEndpoint> = {
  login: {
    path: "auth/login",
    requiresAuth: false,
  },
  allUsers: {
    path: "users",
    requiresAuth: true,
  },
  orders: {
    path: "orders",
    requiresAuth: true,
  },
};
