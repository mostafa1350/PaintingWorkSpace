//Select Shapes
const selectShape = document.querySelectorAll(".liShapes");
// =======================
const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");

let isDrawing = false;
let brushWidth = 5;


window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
});

const startDrawing = ()=>{
    isDrawing = true;
    console.log("Mouse Down");

    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}

const drawing = (e)=>{
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);//creating Line(by Mouse)
    ctx.stroke(); //fill with color
};

selectShape.forEach(myShape => {
    myShape.addEventListener("click",()=>{
        document.querySelector(".ulShapes .active").classList.remove("active");
        myShape.classList.add("active");
        console.log(myShape.id);
    });
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", ()=>isDrawing = false);