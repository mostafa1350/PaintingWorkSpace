
// =======================
const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");
//Select Shapes
const toolBtns = document.querySelectorAll(".liTool"),
fillCollor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#range-slider"),
colorPicker = document.querySelector("#color-picker"),
clearScreen = document.querySelector(".btnClearScreen"),
SaveImage = document.querySelector(".btnSave");
// ========================

let isDrawing = false,
    selectedTool = "brush",
    selectedColor = "#ff4545",
    brushWidth = 1;

// =========== Status of X and Y by Mouse ===============
let pointMouseX , pointMouseY, snapShot;

// =============== LOADING ... ==========================

window.addEventListener("load",()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    fillCollor.checked = false;
    sizeSlider.value = 1;

    // ========CHANGE SCREEN STYLE =========
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000"; 
    // =====================================
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
// =========== START DRAWING =====================
const startDrawing = (e)=>{
    isDrawing = true;
    console.log("Mouse Down");

    
    pointMouseX = e.offsetX;
    pointMouseY = e.offsetY;

    ctx.beginPath();
    ctx.lineWidth = brushWidth;

    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = colorPicker.value;
    // ctx.fillCollor= colorPicker.value;

    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height )
}

const drawing = (e)=>{
    if(!isDrawing) return;
    ctx.putImageData(snapShot, 0, 0);

    if(selectedTool === "brush" || selectedTool === "eraser"){
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : colorPicker.value;
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

// ====== Det for the size of BRUSH ... =========

sizeSlider.addEventListener("change", ()=> {
    brushWidth = sizeSlider.value;
    console.log("SizeSlider = > " + brushWidth);

});

// ============ SHOW AMOUNT IN SLIDER =============

function showAmount(amount){
    document.querySelector("#spanAmountSlider").textContent = amount;
}

// ==================== CLEAR & SAVE SCREEN ====================
clearScreen.addEventListener("click",()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ===================
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    // ===================
});


SaveImage.addEventListener("click",()=>{
  
    const createLink = document.createElement("a");    
    createLink.download = `${Date.now()}.jpeg`;

    console.log(Date.now());

    createLink.href = canvas.toDataURL();
    document.body.appendChild(createLink);
    createLink.click();
    document.body.removeChild(createLink);
});

// ==================== ============= ====================

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", ()=>isDrawing = false);