import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "../utils/firebase";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function PostCreate() {
  const history = useHistory();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  let file = null;

  const user = JSON.parse(localStorage.getItem("user")) || {};

  if (Object.keys(user).length === 0) {
    return <h1>Login to access</h1>;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const image = file.files[0];

    const newKey = firebase.database().ref("Posts/").push().key;

    //New Data
    const newData = {
      title,
      description,
      date: new Date().toISOString(),
    };

    if (image) {
      const size = image.size / 1024 / 1024;

      // Check image size
      if (size > 2) {
        // If image is larger than 2mb return
        alert("Image is too large");
        return;
      }

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child("images/" + newKey).put(image);

      uploadTask.on(
        "state_change",
        () => {},
        (error) => {
          alert(error);
        },
        (success) => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            newData.image = url;
            firebase.database().ref("Posts/").child(newKey).set(newData);
            history.replace("/admin");
          });
        }
      );
    }
  }

  return (
    <>
      <Header>Create New post</Header>
      <div className="card-container">
        <div className="card card-large">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>New Image</label>
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
                <input type="text" ref={titleInputRef} />
                <br />
              </div>
              <div>
                <label>Description: html</label>
                <br />
                <textarea
                  rows="25"
                  cols="80"
                  ref={descriptionInputRef}
                ></textarea>
              </div>
              <button>Create</button>
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

export default PostCreate;
