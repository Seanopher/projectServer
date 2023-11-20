const showAlbums = async() => {
    const albumJSON = await getJSON();
    
    let albumDiv = document.getElementById("album-list");

    albumJSON.forEach((album) => {
        let section = document.createElement("section");
        albumDiv.append(section);

        let h2 = document.createElement("h2");
        section.append(h2);
        h2.innerHTML = album.artist; 

        let h3 = document.createElement("h3");
        section.append(h3);
        h3.innerHTML = album.name; 

        let img = document.createElement("img");
        section.append(img);
        img.src = "http://localhost:3000/" + album.img;
    });
};

const getJSON = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/albums");
      return await response.json();
    } catch (error) {
      console.log("error while retrieving json");
      return "";
    }
  };
  
  window.onload = () => {
    showAlbums();
  };