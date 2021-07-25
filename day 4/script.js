//dados iniciais
//define o quadro de jogo e as variáveis
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let player = '';
let warning = '';
let playing = false;

//reseta a tela
reset();

//eventos
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
});

//funções
function reset(){
    warning = '';
    //gera um player aleatório
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
    //zera o quadro
    for(let i in square){
        square[i] = '';
    }
    //inicia o jogo
    playing = true;
    
    renderSquare();
    renderInfo();
}

function itemClick(event){
    let item = event.target.getAttribute('data-item');
    //define no quadro de jogo, a posição do click
    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}


function renderSquare(){
    //atualiza o quadro de jogo na tela
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}


function renderInfo(){
    //atualiza as informações de jogo
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer(){
    //troca de jogador a cada jogada
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame(){
    //verifica se o jogador ganhou, ou deu empate e para o jogo
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu!';
        playing = false;
    }else if(checkWinnerFor('o')){
        warning = 'O "o" venceu!';
        playing = false;
    }else if(isFull()){
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player){
    //array com todas as possibilidades de vencer
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    //percorre as possibilidades e verifica no quadro se está marcado com o jogador que venceu
    for(let w in pos){
        let possibleArray = pos[w].split(','); //a1, a2, a3

        let hasWon =  possibleArray.every(option => square[option] === player);
        //se tudo estiver marcado retorna true
        if(hasWon){
            return true;
        }
    }
    //se não, retorna false e o jogo continua
    return false;
}

//verifica se o quadro de jogo está cheio e ninguém ganhou
function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}
