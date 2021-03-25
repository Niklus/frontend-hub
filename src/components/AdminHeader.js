import { Link } from "react-router-dom";

function AdminHeader(props) {
  return (
    <header>
      <h1>Admin Page</h1>
      <div>
        <Link to={`/`}>
          <button>Home</button>
        </Link>
        <Link to={`/create`}>
          <button style={{ marginLeft: "10px" }}>Create New</button>
        </Link>
        <button style={{ marginLeft: "10px" }} onClick={props.onSignOut}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
