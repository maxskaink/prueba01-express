const { Router } = require("express"); 

const router = Router();

router.get("/users", (req, res) => {
    res.json({ message: "GET users" });
});




module.exports = router;