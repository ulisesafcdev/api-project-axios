const $gallery = document.querySelector(".gallery");

let pagina = 1;

document.addEventListener("click", (e) => {
  if (e.target.matches(".next")) {
    if (pagina < 71) {
      pagina += 1;
      showImages();
    }
  }

  if (e.target.matches(".prev")) {
    if (pagina > 1) {
      pagina -= 1;
      showImages();
    }
  }
})

const showImages = function () {
  axios.get(`https://images-api.nasa.gov/search?q=planets&media_type=image&page=${pagina}`)
    .then(res => {
      console.log(res);
      let info = res.data;

      for (const key in info) {
        let elements = info[key];

        for (const el in elements) {
          if (el === "items") {
            let items = elements[el];
            let images = '';
            items.forEach(e => {
              let data = e.data;
              let link = e.links;

              data.forEach(d => {

                link.forEach(l => {
                  images += `
                  <figure>
                    <img src="${l.href}" alt="img-nasa">
                    <figcaption>${d.title}</figcaption>
                  </figure>
                `;
                })
              })
            });

            $gallery.innerHTML = images;
          }
        }
      }

    })
    .catch((err) => {
      let message = `NOT FOUND DATA` || err.statusText;
      $gallery.innerHTML = `
        <h3>${message}</h3>
      `;
    })
}

showImages();
