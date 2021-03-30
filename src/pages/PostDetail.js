import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

function PostDetail({ posts }) {
  const { key } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Frontend Hub | Detail";
  }, []);

  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }

  const myPost = posts.find((post) => {
    return post.key === key;
  });

  const post = myPost.val();

  function sharePost() {
    if (navigator.share) {
      navigator
        .share({
          title: `${post.title}`,
          text: "Check out this article",
          url: `${window.location}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${window.location}`,
        "_blank"
      );
    }
  }

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
            <div className="detail-btns">
              <Link to={`/`}>
                <button className="back-btn">Go Back</button>
              </Link>
              <button onClick={sharePost}>
                <div className="share-btn">
                  Share &nbsp;
                  <img src="/share.svg" alt="" height="18px" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
