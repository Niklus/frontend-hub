import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { firebase } from "../utils/firebase";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import { extractContent } from "../utils/extractText";
import AdminHeader from "../components/AdminHeader";

function AdminPage({ posts }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    document.title = "Frontend Hub | Admin";
  }, []);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (email && password) {
      signIn(email, password);
    }
  }

  function signIn(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  }

  function signOut() {
    firebase.auth().signOut();
    setUser({});
  }

  function deletePost(key) {
    if (window.confirm("Are you sure")) {
      // Delete from database
      const postsRef = firebase.database().ref("Posts/");
      postsRef.child(key).remove();

      //Delete from storage
      const storageRef = firebase
        .storage()
        .ref()
        .child("images/" + key);

      storageRef
        .delete()
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log("Uh-oh, an error occurred!");
        });
    }
  }

  if (Object.keys(user).length === 0) {
    return (
      <>
        <Header>Admin Page</Header>
        <LoginForm
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onFormSubmit={handleFormSubmit}
        />
      </>
    );
  }

  if (posts.length === 0) {
    return (
      <>
        <AdminHeader onSignOut={signOut} />
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <AdminHeader onSignOut={signOut} />
      <div className="posts">
        {posts.map((myPost) => {
          const key = myPost.key;
          const post = myPost.val();
          return (
            <div className="card" key={key}>
              <img
                src={post.image}
                alt={post.title}
                className="img-small"
                loading="lazy"
              />
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <div className="card-text">
                  {extractContent(post.description).substring(0, 30) + "..."}
                </div>
                <p className="card-text date">
                  {dayjs(post.date).format("MMM D YYYY")}
                </p>

                <Link to={`/update/${key}`}>
                  <button>Edit</button>
                </Link>
                <button
                  style={{ marginLeft: "10px", backgroundColor: "crimson" }}
                  onClick={() => deletePost(key)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AdminPage;
