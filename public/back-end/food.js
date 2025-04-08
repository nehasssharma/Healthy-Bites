let main =document.querySelector("#main");
let cursor =document.querySelector("#cursor");
let box =document.querySelector("#box");

const showAlertBtn = document.getElementById('showAlert');
const customAlert = document.getElementById('customAlert');
 
main.addEventListener("mousemove",function(value){
    console.log(value)
    gsap.to(cursor,{
        x:value.x,
        y:value.y,
        duration:1,
        ease:"back.out"
    })
})

box.addEventListener("mouseenter",function(value){
    cursor.textContent="Health Concious";
    gsap.to(cursor,{
        scale:3,
        opacity:.75
    })
})

box.addEventListener("mouseleave",function(value){
    cursor.textContent="";
    gsap.to(cursor,{
        scale:1,
        opacity:1
    })
})

showAlertBtn.addEventListener('click', function(){
    customAlert.style.display = 'flex';
});