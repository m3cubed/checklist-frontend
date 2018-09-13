const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// app.get("*", function(req, res) {
// 	res.sendFile(path.join(__dirname, "public/index.html"), function(err) {
// 		if (err) {
// 			res.status(500).send(err);
// 		}
// 	});
// });

app.use("/", express.static(path.join(__dirname, "build")));

app.listen(port, () => console.log(`listening on ${port}`));
