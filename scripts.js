const button = document.querySelector("#my-btn")
const recette_container = document.querySelector("#recette")

button.addEventListener("click", () => {
   button.innerText="JE VEUX MANGER AUTRE CHOSE"
   fetch('https://www.themealdb.com/api/json/v1/1/random.php')
   .then(response => response.json())
   .then(data => recupIngredients(data.meals[0]))
   .catch(error => console.error('Error:', error));
  });

function recupIngredients(recette){
   console.log(recette);
   let listIngredients= [];
 for (let i = 1; i <=20; i++){
   console.log(recette[`strIngredient${i}`]);
   if(recette[`strIngredient${i}`]){
      let ingredient = recette[`strIngredient${i}`] 
      let mesure = recette[`strMeasure${i}`]
      console.log(`${ingredient} - ${mesure}`);
      listIngredients.push(`${ingredient} - ${mesure}`)
   }
   else{
      break;
   }   
 }
const newInnerHtml = `
 <div id="title">
   <h3>${recette.strMeal}</h3>
   <img src="${recette.strMealThumb}" alt="Photo de la recette">
 </div>
<div class="row">
<h5>Ingredients</h5>
 <ul>
 ${listIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
 </ul>
 </div>
 <div id="instructions">
 <h5>Instructions</h5>
 <p>${recette.strInstructions}</p>
 </div>
 <div id="video">
 <iframe src="https://www.youtube.com/embed/${recette.strYoutube.slice(-11)}" width="400" height="300"></iframe>
 </div>
 `
 recette_container.innerHTML= newInnerHtml;
}

