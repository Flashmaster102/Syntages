const enter=document.querySelector("#enter");
const name=document.querySelector("#name");
const quantity=document.querySelector("#quantity");
const price=document.querySelector("#price");
const ingredientsList=document.querySelector("#ingredientsList");
const ingredients=[],quantities=[],prices=[],total=[];

const display=()=>{
	let listing="";
    if(ingredients.length==0)
      ingredientsList.innerHTML="Δεν υπάρχουν συστατικά!";
    else
	{
		listing+="<table>";
		listing+="<tr><th>Προιόν</th><th>Ποσότητα</th><th>Τιμή(σε kg)</th><th>Τελικό κόστος</th></tr>";
		ingredients.forEach((current,index)=>{
			listing+=`<tr><td>${current}</td><td>${quantities[index]}</td><td>${prices[index]}&euro;</td><td>${total[index]}&euro;</td><td><a href="#" class="deleting">Διαγραφή!</a></td></tr>`;
		});
		listing+=`<tr><td colspan="3">Συνολικό κόστος</td><td>${total.reduce((total,current)=>currency(total).add(current))}&euro;</td></tr>`;
		listing+="</table>";
		ingredientsList.innerHTML=listing;
		const links=document.getElementsByClassName("deleting");
		for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click",()=>{
				 ingredients.splice(i,1);
				 quantities.splice(i,1);
				 prices.splice(i,1);
				 total.splice(i,1);
				 display();
		    });
		}
	}
       		 
};

enter.addEventListener("click",()=>{
	let listing="";
	if(name.value===""&&Number(quantity.value)===0&&Number(price.value)===0)
		alert("Συμπληρώστε όλα τα πεδία!");
	else
	{
		ingredients.push(name.value);
		quantities.push(Number(quantity.value));
		prices.push(Number(price.value));
		total.push(currency(Number(quantity.value)).multiply(Number(price.value)));
		display();
	}
	
});

