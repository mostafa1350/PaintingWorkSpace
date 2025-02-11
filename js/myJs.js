const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");

window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
});

const drawing = (e)=>{
    ctx.lineTo(e.offsetX, e.offsetY);//creating Line(by Mouse)
    ctx.stroke(); //fill with color
};
canvas.addEventListener("mousemove", drawing);