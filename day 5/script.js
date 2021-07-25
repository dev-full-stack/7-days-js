//initial data
let currentColor = 'black';
let screen = document.querySelector('#tela');
//seleciona o contexto em 2d do canvas
let context = screen.getContext('2d');
let canDraw = false;
let mouseX = '';
let mouseY = '';

//events
//seleciona todos os botões de cor e adiciona o evento que chama a função de trocar de cor
document.querySelectorAll('.colorArea .color').forEach(element => element.addEventListener('click', toggleColor));

document.querySelector('.clear').addEventListener('click', clear);

/*
passo a passo para desenhar no canvas

-quando o mouse for abaixado, ative o modo desenho
-quando o mouse for movido, se o modo desenho estiver ativado, desenhe
-quando o click do mouse levantar, desative o modo desenho.

*/

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

//functions
function mouseDownEvent(event) {
    canDraw = true;
    //compensa a posição do mouse em relação a tela do canvas
    mouseX = event.pageX - screen.offsetLeft;
    mouseY = event.pageY - screen.offsetTop;
}

function mouseMoveEvent(event){
    if(canDraw){
        //chama a função de desenhar na tela
        draw(event.pageX, event.pageY);
    }
}

function mouseUpEvent(){
    canDraw = false;
}

function draw(x, y){
    //pega a posição do mouse
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //inicia o Desenho
    context.beginPath();
    //define a largura do desenho
    context.lineWidth = 5;
    //define o tipo do desenho
    context.lineJoin = "round";
    //define o inicio do desenho
    context.moveTo(mouseX, mouseY);
    //define o final do desenho
    context.lineTo(pointX, pointY);    
    //finaliza o desenho
    context.closePath();
    //define a cor do desenho
    context.strokeStyle = currentColor;
    //pinta o desenho
    context.stroke();

    //muda a posição atual do mouse para a anterior fazendo um movimento contínuo
    mouseX = pointX;
    mouseY = pointY;
}

function toggleColor(event){
    //cor selecionada
    let color = event.target.getAttribute('data-color');
    //muda a cor atual para a cor selecionada
    currentColor = color;

    //remove a seleção da cor atual
    document.querySelector('.color.active').classList.remove('active');
    //adiciona a seleção na cor selecionada
    event.target.classList.add('active');
}

function clear(){
    context.setTransform(1, 0, 0, 1, 0, 0);
    //limpa o canvas, do ponto inicial ao ponto final
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
