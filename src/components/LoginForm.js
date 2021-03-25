function LoginForm(props) {
  return (
    <div className="form-container">
      <form className="card" onSubmit={props.onFormSubmit}>
        <div className="card-body">
          <label htmlFor="email">Email</label>
          <br />
          <input
            value={props.email}
            onChange={props.onEmailChange}
            type="email"
            id="email"
            placeholder="Enter Email"
            required
          />
          <br />
          <label htmlFor="login">Password</label>
          <br />
          <input
            value={props.password}
            onChange={props.onPasswordChange}
            type="password"
            id="login"
            placeholder="Enter Password"
            required
          />
          <br />
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
