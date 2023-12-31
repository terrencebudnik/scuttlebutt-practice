import React, { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import "./AccountPage.css";

function AccountPage() {
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const auth = getAuth(app);
  const db = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const userRef = ref(db, "users/" + userId);
      get(userRef)
        .then((snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setPhone(userData.phone);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, [db, userId]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="account-page">
      <MainHeader />
      <div className="account-container">
        <h2 className="account-header">Account Details</h2>
        <h3 className="account-name">
          Name: {firstName} {lastName}
        </h3>
        <h3 className="account-phone">Phone: {phone}</h3>
        <br />
        <br />
        <br />

        <button className="logout-button" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
