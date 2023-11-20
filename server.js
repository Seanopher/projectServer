const express = require("express");
const app = express();
const multer = require("multer");
const Joi = require("joi");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images" });

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/albums", (req, res) => {
    const albums = [];

    albums[0] = {
        id: "1",
        name: "Turn Blue",
        artist: "The Black Keys",
        img: "images/turnBlue.png",
    };

    albums[1] = {
        id: "2",
        name: "AM",
        artist: "Arctic Monkeys",
        img: "images/am.jpg"
    };

    albums[2] = {
        id: "3",
        name: "Malibu",
        artist: "Anderson .Paak",
        img: "images/malibu.jpg"
    };
    albums[3] = {
        id: "4",
        name: "The New Abnormal",
        artist: "The Strokes",
        img: "images/theNewAbnormal.png"
    };
    albums[4] = {
        id: "5",
        name: "Connected",
        artist: "Stereo MC's",
        img: "images/connected.jpg"
    };
    albums[5] = {
        id: "6",
        name: "Veni Vidi Vicious",
        artist: "The Hives",
        img: "images/venividivicious.jpg"
    };



    res.json(albums);
});


app.get("/api/albums/:id", (req, res) => {
    const album = albums.find((r) => r.artistId === parseInt(req.params.id));
  
    if (!album)
      res.status(404).send("The album with the given id was not found");
  
    res.send(album);
  });
  
  app.post("/api/albums", upload.single("img"), (req, res) => {
    const result = validateArtist(req.body);
    console.log(result);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    const album = {
      name: req.body.name,
      artist: req.body.artist
    };
  
    if (req.file) {
      album.img = "images/" + req.file.filename;
    }
  
    albums.push(album);
    res.send(album);
  });
  
  app.put("/api/albums/:id", upload.single("img"), (req, res) => {
    const album = albums.find((r) => r.artistId === parseInt(req.params.id));
  
    if (!album) res.status(404).send("Artist with given id was not found");
  
    const result = validateArtist(req.body);
    console.log(result);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    album.name = req.body.name;
    album.artist = req.body.artist;
  
    if (req.file) {
      album.img = "images/" + req.file.filename;
    }
  
    res.send(album);
  });
  
  app.delete("/api/albums/:id", (req, res) => {
    const album = albums.find((r) => r.artistId === parseInt(req.params.id));
  
    if (!album) {
      req.status(404).send("This album with the given id was not found");
    }
  
    const index = albums.indexOf(album);
    albums.splice(index, 1);
  
    res.send(album);
  });
  
  function validateArtist(album) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      album: Joi.string().min(3).required(),
      artistId: Joi.allow(""),
    });
  
    return schema.validate(album);
  }

app.listen(3000, () => {
    console.log("listening");
});