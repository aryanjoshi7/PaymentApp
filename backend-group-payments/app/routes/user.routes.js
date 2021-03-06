const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/creategroup",[verifySignUp.checkDuplicateGroup],controller.createGroup)
  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", authJwt.verifyToken);
  app.get("/api/test/userss", authJwt.verifyToken);
  app.get("/api/group/thisgroup", [verifySignUp.checkMember],controller.allAccess);
  
};