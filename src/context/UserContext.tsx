import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Accepted user credentials list (Replace with actual API or database call)

type UserType = "user" | "admin";

interface UserData {
  username: string; // Added username field
  name: string;
  email: string;
  role: UserType;
  token: string;
}

interface UserContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  userType: UserType;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserType: (type: UserType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userType, setUserType] = useState<UserType>("user");

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    if (token && storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setIsAuthenticated(true);
        setUserType(parsedUserData.role);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      }
    }
  }, []);

const login = async (
  name: string,
  email: string,
  password: string,
  UserType:string
) => {
  const userData = {
    username: name, // Set username
    email: email,
    role: UserType, // Default role set to "user"
    token: UserType+" token",
  };

  localStorage.setItem("token", userData.token);
  localStorage.setItem("userData", JSON.stringify(userData));
  setUserData(userData);
  setIsAuthenticated(true);
  setUserType(userType); // Set user type to default
};

  const register = async (name: string, email: string, password: string) => {
    // Simulated registration
    const userData = {
      username: name, // Set username
      name,
      email,
      role: "user" as UserType,
      token: "new-user-token",
    };

    localStorage.setItem("token", userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
    setIsAuthenticated(true);
    setUserType("user");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setUserData(null);
    setUserType("user");
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        userData,
        userType,
        login,
        register,
        logout,
        setUserType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
export const useUser1 = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser1 must be used within a UserProvider");
  }
  return context;
};
