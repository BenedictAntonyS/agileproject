import { Mail, Calendar, BookOpen } from 'lucide-react';
import React, { useState } from "react";
import ReactDOM from "react-dom";
interface UserProfileProps {
  userData: {
    name: string;
    email: string;
    dateOfBirth: string;
    bio: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  return (
    <div>
      <h1>{userData.name}</h1>
      <p><Mail /> {userData.email}</p>
      <p><Calendar /> {userData.dateOfBirth}</p>
      <p><BookOpen /> {userData.bio}</p>
    </div>
  );
}

export default UserProfile;
 // Ensure correct relative path


const App: React.FC = () => {
  const [message, setMessage] = useState("Connecting to MongoDB...");

  //useEffect(() => {
  //  setTimeout(() => {
  //    setMessage("✅ Connected to MongoDB Atlas!");
  //  }, 2000);
  //}, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My mongo db</h1>
      
      <p>{message}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
