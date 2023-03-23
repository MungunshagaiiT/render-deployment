import jsonwebtoken from "jsonwebtoken";

const create_jwt = () => {
  const token = jsonwebtoken.sign({ foo: "bar" }, "shhhhh");
  console.log(token);
};
function authenticateTone(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "Authetication failed" });
  jwt.verify("sha256");
}
create_jwt();
