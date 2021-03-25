import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Header from "../components/Header";
import { extractContent } from "../utils/extractText";

function HomePage({ posts }) {
  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Header>Frontend Hub</Header>
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
                <Link to={`/detail/${key}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
