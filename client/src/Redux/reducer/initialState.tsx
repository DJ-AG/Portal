export interface initialStateProps {
  users: [{}];
  currentUser: {
    _id: string;
    name: string;
    email: string;
    roleLevel: string;
  };
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
}

// export a constant called initialState
// this constant will be the initial state of the application
// it will be an object that conforms to the initialStateProps interface
export const initialState: initialStateProps = {
  users: [
    {
      _id: "",
      firstname: "",
      lastname: "",
      email: "",
      premises: [],
      role: "",
      availabilities: [],
      reservations: [],
      createdAt: "",
      updatedAt: "",
    },
  ],
  currentUser: { _id: "", name: "", email: "", roleLevel: "" },
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};