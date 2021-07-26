//o e.target seleciona o elemento em que foi clicado, já o e.currentTarget seleciona o elemento em que foi adicionado o evento
// document.querySelector('.neutralArea').addEventListener('click', (e) => {
//     console.log(e.target);
//     console.log(e.currentTarget);
// });

//initial data
let areas = {
    a: null, 
    b: null, 
    c: null
};

//events
document.querySelectorAll('.item').forEach(item => {
    //evento de começar a arrastar o item
    item.addEventListener('dragstart', dragStart);
    //evento quando terminar de arrastar o item
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

//functions item
function dragStart(e){
    //adicionar estilo ao começar a arrastar
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e){
    //remover estilo ao soltar o elemento que está sendo arrastado
    e.currentTarget.classList.remove('dragging');
}

//functions area
//acontece quando um elemento está sendo arrastado na área de soltar
function dragOver(e){
    //previne o comportamento padrão, para poder soltar o elemento
    if(e.currentTarget.querySelector('.item') === null){
        e.preventDefault();
        //adiciona o fundo mais escuro
        e.currentTarget.classList.add('hover');
    }
}

//acontece quando um elemento sai da área de soltar
function dragLeave(e){
    //remove o fundo mais escuro
    e.currentTarget.classList.remove('hover');
}

//acontece quando um elemento é solto dentro de uma área de soltar, mas para acontecer, precisa previnir o comportamento padrão no dragover
function drop(e){
    e.currentTarget.classList.remove('hover');
        
    //verifica se existe item dentro da caixa de soltar
    if(e.currentTarget.querySelector('.item') === null){
        //seleciona o item que será dropado
        let dragItem = document.querySelector('.item.dragging');
        //move o elemento e todos os eventos para a caixa selecionada
        e.currentTarget.appendChild(dragItem);

        updateAreas();
    }
}

//functions neutral area
function dragOverNeutral(e){
    //previne o comportamento padrão
    e.preventDefault();
    //adiciona o fundo mais escuro
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e){
    //remove o fundo mais escuro
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e){
    //remove o fundo mais escuro
    e.currentTarget.classList.remove('hover');
     //seleciona o item que será dropado
     let dragItem = document.querySelector('.item.dragging');
     //move o elemento e todos os eventos para a caixa selecionada
     e.currentTarget.appendChild(dragItem);

     updateAreas();
}

//logic functions
function updateAreas(){
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML;
        }else{
            areas[name] = null;
        }
    });

    console.log(areas)

    if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
        document.querySelector('.areas').classList.add('correct');
    }else{
        document.querySelector('.areas').classList.remove('correct');
    }
}