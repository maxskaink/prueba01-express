const { Router} = require("express");

const router = Router();

router.get("/isActive", (req, res) => res.sendStatus(204) );

module.exports = router;