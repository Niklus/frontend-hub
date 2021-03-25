import { useState, useEffect } from "react";
import { firebase } from "./utils/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetail from "./pages/PostDetail";
import AdminPage from "./pages/AdminPage";
import PostUpdate from "./pages/PostUpdate";
import PostCreate from "./pages/PostCreate";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = firebase.database().ref("Posts/");
    postsRef.on("value", (snap) => {
      const myPosts = [];
      snap.forEach((post) => {
        myPosts.push(post);
      });
      setPosts(myPosts);
    });
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage posts={posts} />
          </Route>
          <Route path="/detail/:key">
            <PostDetail posts={posts} />
          </Route>
          <Route path="/admin">
            <AdminPage posts={posts} />
          </Route>
          <Route path="/update/:key">
            <PostUpdate posts={posts} />
          </Route>
          <Route path="/create">
            <PostCreate />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
