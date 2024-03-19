"use strict";

const average = document.getElementById("average"),
    highest = document.getElementById("highest"),
    resultado = document.getElementById("resultado"),
    img = document.getElementById("imagen-alt");

let mate = document.getElementById("mate"),
    lengua = document.getElementById("lengua"),
    efsi = document.getElementById("efsi");

let arrayNotas = [mate, lengua, efsi];

const validateInput = element => {
    if(parseInt(element.value) > 10 || parseInt(element.value) < 1){
        alert(`En la materia ${element.name}, se ingresó un numero invalido`)
    }
}

arrayNotas.forEach((element) => {
    element.onkeyup = () => {
        if(parseInt(element.value) > 10 || parseInt(element.value) < 1){
            element.classList.add("incorrect")
            element.classList.remove("correct")
        }
        else{
            element.classList.add("correct")
            element.classList.remove("incorrect")
        }
    }
})

average.addEventListener("click", () => {
    let notas = getValues()
    let promedio = 0;

    notas.forEach(element => {
        promedio += parseInt(element.value)
    });

    promedio = promedio / notas.length;

    resultado.innerHTML = `<h2>Promedio</h2>
    <p id="avg">${promedio}</p>`;

    let avg = document.getElementById("avg")

    if(parseInt(avg.innerHTML) < 6){
        avg.classList.add("false")
        avg.classList.remove("true")
        img.setAttribute("src", "img/mal.gif");
    }
    else{
        avg.classList.add("true")
        avg.classList.remove("false")
        img.setAttribute("src", "img/bien.gif");
    }
});

highest.addEventListener("click", () => {
    let notas = getValues()
    let num = 0;
    let alto = [];

    notas.forEach(element => {
        if(num <= parseInt(element.value)){
            num = parseInt(element.value)
            alto.push(element)
            alto = alto.filter((item) => item.value >= num);
        }
    });

    resultado.innerHTML = `<h2>Mayor nota</h2>
    <p id="high">${alto[0].value}</p>
    <h2>Materia</h2>`

    alto.forEach((element) => {
        const padre = element.parentNode
        const hijo = padre.firstElementChild
        hijo.style.color = "darkblue"
        resultado.innerHTML += `<p id="high">${element.name}</p>`;
    })
});

const getValues = () =>{
    let array = [mate, lengua, efsi];
    
    if (array.some(v => v.value == "")) {
        alert("No esta completo")
    }

    array.forEach((element) => {
        validateInput(element)
    })
        
    return array
}