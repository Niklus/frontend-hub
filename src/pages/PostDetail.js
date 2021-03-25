import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

function PostDetail({ posts }) {
  const { key } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }

  const myPost = posts.find((post) => {
    return post.key === key;
  });

  const post = myPost.val();

  return (
    <>
      <Header>Frontend Hub</Header>
      <div className="card-container">
        <div className="card card-large">
          <img src={post.image} className="image-large" alt={post.title} />
          <div className="card-body card-body-large">
            <h2 className="card-title">{post.title}</h2>
            <div
              className="card-text"
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></div>
            <Link to={`/`}>
              <button>Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
