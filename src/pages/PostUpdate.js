import { useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { firebase } from "../utils/firebase";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function PostUpdate({ posts }) {
  const param = useParams();
  const history = useHistory();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  let file = null;

  const user = JSON.parse(localStorage.getItem("user")) || {};

  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }

  if (Object.keys(user).length === 0) {
    return <h1>Login to access</h1>;
  }

  const myPost = posts.find((post) => {
    return post.key === param.key;
  });

  const post = myPost.val();
  const key = myPost.key;

  function handleFormSubmit(e) {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const image = file.files[0];

    if (image) {
      const size = image.size / 1024 / 1024;

      // Check image size
      if (size > 2) {
        // If image is larger than 2mb return
        alert("Image is too large");
        return;
      }

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child("images/" + key).put(image);

      uploadTask.on(
        "state_change",
        () => {},
        (error) => {
          alert(error);
        },
        (success) => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            const updateData = {
              title,
              description,
              image: url,
            };

            firebase.database().ref("Posts/").child(key).update(updateData);
          });
        }
      );
    } else {
      const updateData = {
        title,
        description,
        image: post.image,
      };

      firebase.database().ref("Posts/").child(key).update(updateData);
    }

    history.replace("/admin");
  }

  return (
    <>
      <Header>Update</Header>
      <div className="card-container">
        <div className="card card-large">
          <img src={post.image} className="image-large" alt={post.title} />
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Change Image</label>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  ref={(ref) => (file = ref)}
                />
                <br />
              </div>
              <div>
                <label>Title</label>
                <br />
                <input
                  type="text"
                  defaultValue={post.title}
                  ref={titleInputRef}
                />
                <br />
              </div>
              <div>
                <label>Description: html</label>
                <br />
                <textarea
                  rows="10"
                  cols="70"
                  defaultValue={post.description}
                  ref={descriptionInputRef}
                ></textarea>
              </div>
              <button>Update</button>
            </form>
            <Link to={`/admin`}>
              <button>Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostUpdate;
