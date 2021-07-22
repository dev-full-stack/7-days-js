//escuta um evento no body, no caso keyup, quando uma tecla for solta
document.body.addEventListener('keyup', (event) => {
    //chama a função playSound e passa a tecla pressionada como parâmetro, deixando todos os caracteres em minúsculo
    playSound(event.code.toLowerCase());
});

//escuta um evento no botão de tocar uma composição
document.querySelector('.composer button').addEventListener('click', () => {
    //pega o valor do input de composição
    let song = document.querySelector('#input').value;

    //verifica se a melodia não está vazia
    if(song !== ''){
        //transforma a string do input em array
        let songArray = song.split('');
        //chama a função de tocar a composição
        playComposition(songArray);
    }
})

//função de tocar o som, recebendo a tecla como parâmetro
function playSound(sound){
    //seleciona o arquivo do áudio de forma dinâmica
    let audioElement = document.querySelector(`#s_${sound}`);
    //seleciona a tecla clicada na tela
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    //verifica se existe o arquivo de audio
    if(audioElement){
        //zera o audio caso ainda não tenha terminado de tocar
        audioElement.currentTime = 0;
        //play no audio
        audioElement.play();
    }

    //verifica se a tecla pressionada é válida e existe na tela
    if(keyElement){
        //adiciona a classe active no elemento
        keyElement.classList.add('active');
        //cria um intervalo de tempo e remove a classe active do elemento
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 300);
    }
}

//função de tocar uma composição, recebe o array gerado no evento de click do botão
function playComposition(songArray){
    //define a variável de tempo como valor padrão 0
    let wait = 0;

    //percorre o array recebido como parâmetro
    for(let songItem of songArray){
        //cria um intervalo de tempo para que não reproduza todos os sons de uma vez
        setTimeout(()=> {
            //play no áudio
            playSound(`key${songItem}`);
            
        }, wait)
        //adiciona um incremento de 250 milisegundos no intervalo
        wait += 250
    }
}