// Define an interface for the user object
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  // Define the interface for the initialState
  interface InitialState {
    user: User;
    token: string;
    isLogged: boolean;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    successMessage: string;
  }
  
  // initialState with interfaces
  const initialState: InitialState = {
    user: {
      id: "",
      name: "",
      email: "",
      role: "",
    },
    token: "",
    isLogged: false,
    isLoading: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
  };

  export type { User, InitialState };
  export { initialState };