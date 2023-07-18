document.addEventListener("DOMContentLoaded", async () => {
    const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json");
    const pets = await petPromise.json();
    console.log(pets);

    const template = document.querySelector("#animal-card");
    const wrapper = document.querySelector(".animals");

    function decideAgeText(age) {
        if (!age) {
            return "Less than a year old";
        }
        return age > 1 ? `${age} years old` : "1 year old";
    }

    pets.forEach((pet) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector("h3").textContent = pet.name;

        const img = clone.querySelector("img");
        img.src = pet.photo;
        img.alt = `A ${pet.species} named ${pet.name}`;

        const birthYear = new Date(pet.birthYear).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        const ageText = decideAgeText(age);
        console.log(clone);
        clone.querySelector(".age").textContent = ageText;
        clone.querySelector(".species").textContent = pet.species;
        clone.querySelector(".description").textContent = pet.description;
        clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}/`;

        wrapper.appendChild(clone);
    });
});

const filterButtons = document.querySelectorAll(".filter-nav a");
filterButtons.forEach((el) => {
    el.addEventListener("click", (e) => handleFilterClick(e));
});

function handleFilterClick(e) {
    let target = e.target;

    e.preventDefault();
    filterButtons.forEach((el) => {
        el.classList.remove("active");
    });
    target.classList.add("active");

    filterPets(target.dataset.filter)
}

function filterPets(species)  {
   const allPets = document.querySelectorAll(".animal-card")
   if (species == "all") {
     allPets.forEach(el => {
        el.style.display = ""
     })
   } else  {
    allPets.forEach(el => {
        if (el.querySelector(".species").textContent == species) {
         el.style.display = ""
        } else {
          el.style.display = "none"
        }
    })

   }
}



  


  

