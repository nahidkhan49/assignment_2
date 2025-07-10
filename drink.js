let count=0;

const drinkApi=(ninput)=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ninput}`)
    .then((res)=>res.json())
    .then((data)=>{
        displayDrink(data);
        // console.log(data);
    })
};


document.getElementById("btn").addEventListener("click",(event)=>{
    event.preventDefault();
    const input=document.getElementById("input").value.trim();
    if(input){
        drinkApi(input);
        document.getElementById("input").value="";
    }
});

const displayDrink=(alldrink)=>{
    const drinkContainer=document.getElementById("drink_container");
    drinkContainer.innerHTML="";
    if(alldrink.drinks){
        alldrink.drinks.forEach((drink) => {
            const div=document.createElement("div");
            div.classList.add("cards")

            div.innerHTML=`
            <img  class="cimg" src="${drink.strDrinkThumb}" alt="">
            <h5>Name: ${drink.strDrink.slice(0,15)} </h5>
            <p>Category: ${drink.strCategory}</p>
            <p>Instruction: ${drink.strInstructions.slice(0,20)}</p>
            <button onclick="cartcontain('${drink.strDrinkThumb}','${drink.strDrink}',this)" type="button" class="btn btn-outline-danger">Add to cart</button>
            <button onclick="modalsection('${drink.strDrinkThumb}','${drink.strDrink}','${drink.strCategory}','${drink.strInstructions}','${drink.strAlcoholic}')" type="button" class="btn btn-outline-primary">Details</button>
            `;
            drinkContainer.appendChild(div);
        });
    }
    else{
        drinkContainer.innerHTML=`
        <h1>No drinks found!</h1>
        `;
    }

};

const alwaysdisplayDrink=(alldrink)=>{
    const drinkContainer=document.getElementById("drink_container");
    if(alldrink.drinks){
        alldrink.drinks.forEach((drink) => {
            const div=document.createElement("div");
            div.classList.add("cards")

            div.innerHTML=`
            <img  class="cimg" src="${drink.strDrinkThumb}" alt="">
            <h5>Name: ${drink.strDrink.slice(0,15)} </h5>
            <p>Category: ${drink.strCategory}</p>
            <p>Instruction: ${drink.strInstructions.slice(0,20)}</p>
            <button onclick="cartcontain('${drink.strDrinkThumb}','${drink.strDrink}',this)" type="button" class="btn btn-outline-danger">Add to cart</button>
            <button onclick="modalsection('${drink.strDrinkThumb}','${drink.strDrink}','${drink.strCategory}','${drink.strInstructions}','${drink.strAlcoholic}')" type="button" class="btn btn-outline-primary">Details</button>
            `;
            drinkContainer.appendChild(div);
        });
    }

};

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Cocktail`)
    .then((res)=>res.json())
    .then((data)=>{
        alwaysdisplayDrink(data);
        // console.log(data);
    });

// document.getElementsByClassName("btn").addEventListener("click",()=>{
//     document.getElementsByClassName("btn").innerText="Already selected"
// });

const cartcontain=(pimg,pname,btn)=>{
    const cartcount=document.getElementById("cartcount").innerText;
        let newcount=parseInt(cartcount);
        newcount=newcount+1;
        

    const cartter=document.getElementById("addcart");
    console.log(pimg,pname);
    const div=document.createElement("div");
    div.classList.add("addcart")
    div.innerHTML=`
    <p style="margin-top:19px">${newcount}</p>
    <img class="crtimg" src="${pimg}">
    <p style="margin-top:10px">${pname}</p>
    `;
    
    
    
    if(newcount<=7){
        cartter.appendChild(div);
        document.getElementById("cartcount").innerText=newcount;
        btn.innerText="Already selected";
        btn.classList.remove("btn-outline-danger");
        btn.classList.add("btn-success");
    }
    else{
        alert("cart is full");
    }
    
};

const modalsection=(img,name,cata,ins,alc)=>{
    const modalbody=document.getElementById("modal-body");
    modalbody.innerHTML="";
    const div=document.createElement("div");
    div.classList.add("modals");

    div.innerHTML=`
    <img  class="dimg" src="${img}" alt="">
    <p><b>Details</b></p>
    <p>Category: <b>${cata}</b></p>
    <p>Alcoholic: <b>${alc}</b></p>
    <p>Instruction: ${ins}</p>
    `;
    modalbody.appendChild(div);

    const modaltitle=document.getElementById("modal-title");
    modaltitle.innerText=name;

    const mymodal=new bootstrap.Modal(document.getElementById("detailmodal"));
    mymodal.show();
    
};




