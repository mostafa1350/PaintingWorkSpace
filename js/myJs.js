
// =======================
const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");
//Select Shapes
const toolBtns = document.querySelectorAll(".liTool"),
fillCollor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#range-slider"),
colorPicker = document.querySelector("#color-picker");
// ========================

let isDrawing = false,
    selectedTool = "brush",
    selectedColor = "#ff4545",
    brushWidth = 1;

// =========== Status of X and Y by Mouse ===============
let pointMouseX , pointMouseY, snapShot;

// =============== LOADING ... ==========================

window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    fillCollor.checked = false;    
    sizeSlider.value = 1;
});

// ============= CREATE Shape Function ================
const drawRectangle = (e)=>{
    if(!fillCollor.checked)
    {
        return ctx.strokeRect(e.offsetX,e.offsetY,pointMouseX - e.offsetX ,pointMouseY - e.offsetY);

    }
    ctx.fillRect(e.offsetX,e.offsetY,pointMouseX - e.offsetX ,pointMouseY - e.offsetY);
    
}
const drawCircle = (e)=>{
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((pointMouseX-e.offsetX),2) + Math.pow((pointMouseY-e.offsetY),2));

    ctx.arc(pointMouseX ,pointMouseY, radius, 0, 2*Math.PI);

    if(!fillCollor.checked){ctx.stroke();}
    else{ctx.fill();}    
}

const drawTriangle = (e)=>{
    ctx.beginPath();
    ctx.moveTo(pointMouseX,pointMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(pointMouseX * 2 - e.offsetX , e.offsetY);
    ctx.closePath();
    ctx.stroke();
    
    //Condition ...
    if(!fillCollor.checked){ctx.stroke();}
    else{ctx.fill();} 
    
}
// ===============================================
// =========== START DRAWING =====================
const startDrawing = (e)=>{
    isDrawing = true;
    console.log("Mouse Down");

    
    pointMouseX = e.offsetX;
    pointMouseY = e.offsetY;

    ctx.beginPath();
    ctx.lineWidth = brushWidth;

    ctx.strokeStyle = colorPicker.value;
    ctx.fillCollor= colorPicker.value;

    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height )
}

const drawing = (e)=>{
    if(!isDrawing) return;
    ctx.putImageData(snapShot, 0, 0);

    if(selectedTool === "brush"){
        ctx.lineTo(e.offsetX, e.offsetY);//creating Line(by Mouse)
        ctx.stroke(); //fill with color
    }else if(selectedTool === "rectangle"){
        drawRectangle(e);
    }else if(selectedTool === "circle"){
        drawCircle(e);
    }else{
        drawTriangle(e);
    }

};

toolBtns.forEach(btn => {
    btn.addEventListener("click",()=>{
        document.querySelector(".ulShapes .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});

// Det for the size of BRUSH ...

sizeSlider.addEventListener("change", ()=> {
    brushWidth = sizeSlider.value;
    console.log("SizeSlider = > " + brushWidth);
    // document.getElementById("spanAmountSlider").innerHTML = brushWidth;
    // document.querySelector("#spanAmountSlider").textContent = sizeSlider.value;

});

function showAmount(amount){
    // document.getElementById("spanAmountSlider").textContent = sizeSlider.value;
    document.querySelector("#spanAmountSlider").textContent = amount;
}

// colorPicker.addEventListener("change", ()=>{
//     colorPicker.parentElement.style.background = colorPicker.value;
//     colorPicker.parentElement.click();

//     console.log("color : " + colorPicker.value);

// });

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", ()=>isDrawing = false);