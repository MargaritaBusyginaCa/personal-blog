const authentication = (req, res, next) => {
  const auth = { login: "example", password: "example" }; //will change later

  // parse login and password from headers
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  if (login && password && login === auth.login && password === auth.password) {
    // Access granted...
    return next();
  }

  // Access denied...
  res.set("WWW-Authenticate", 'Basic realm="401"');
  res.status(401).send("Authentication required.");
};

export default authentication;
