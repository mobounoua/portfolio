document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById("projets__container");
            const filtersContainer = document.getElementById("projets__filters");// selectionner le conteneur des filtres

            const categories = [...new Set(data.map(project => project.category))]; // recuperation des categories
            categories.unshift('all'); // ajouter "tous" au categories

            // création des boutons filtres
            function createFilterItems(categories) {
                filtersContainer.innerHTML = ''; // Clear existing filters
                categories.forEach(category => {
                    const filterItem = document.createElement("div");
                    filterItem.classList.add("filter-item");
                    filterItem.dataset.category = category;
                    filterItem.textContent = category === 'all' ? 'Tous' : category;
                    filtersContainer.appendChild(filterItem);
                });
            }

            //afficher les projets
            function displayProjects(projects){
                projectsContainer.innerHTML = '';
                projects.forEach(project => {
                    const projectElement = document.createElement("a"); //creation du conteneur des projets
                    projectElement.classList.add("projet");
                    projectElement.href = project.link;
    
                    const projectImage = document.createElement("img");
                    projectImage.src = project.image;
                    projectImage.alt = project.name;
    
                    const projectInfo = document.createElement("div")
                    projectInfo.classList.add("projet-info")
                    const projectName = document.createElement("h4");
                    projectName.textContent = project.name;
                    const projectDescrip = document.createElement("p")
                    projectDescrip.textContent = project.description;
    
                    projectElement.appendChild(projectImage);
                    projectElement.appendChild(projectInfo);
                    projectInfo.appendChild(projectName);
                    projectInfo.appendChild(projectDescrip);
    
                    projectsContainer.appendChild(projectElement);
                });
            }
            // filtrer par categorie
            function filterProjects(category) {
                if (category === "all") {
                    displayProjects(data);
                } else {
                    const filteredProjects = data.filter(project => project.category === category);
                    displayProjects(filteredProjects);
                }
            }
            // Initialisation
            createFilterItems(categories);
            displayProjects(data);

            // Gestion des clics sur les éléments de filtre
            filtersContainer.addEventListener("click", (event) => {
                if (event.target.classList.contains("filter-item")) {
                    const category = event.target.dataset.category;
                    // Retirer la classe active de tous les éléments de filtre
                    document.querySelectorAll(".filter-item").forEach(item => item.classList.remove("active"));
                    // Ajouter la classe active à l'élément de filtre cliqué
                    event.target.classList.add("active");
                    filterProjects(category);
                }
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});

            