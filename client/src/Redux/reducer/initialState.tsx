export interface initialStateProps {
  users: [{}];
  currentUser: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
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
  currentUser: { _id: "", firstname: "",lastname:"", email: "", role: "" },
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};