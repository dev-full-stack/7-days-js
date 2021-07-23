//seleciona a div de relógio digital
let digitalElement = document.querySelector('.digital');
//seleciona os ponteiros do relógio analógico
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');

//função de atualizar relógio
function updateClock(){
    //pega a data atual
    let now = new Date();
    //pega a hora da data atual
    let hour = now.getHours();
    //pega os minutos da hora atual
    let minute = now.getMinutes();
    //pega os segundos da hora atual
    let second = now.getSeconds();

    //atualiza o relógio digital
    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    //atualiza o relógio analógico
    // o calculo é feito com base com os 360 graus de um círculo, divididos pela quantidade de tempo que tem os minutos, segundos ou hora
    //multiplicados pelos segundos e diminuídos os 90 graus de compensação do css
    let sDeg = ((360 / 60) * second) - 90;
    let mDeg = ((360 / 60) * minute) - 90;
    let hDeg = ((360 / 12) * hour) - 90;

    //atualiza os ponteiros na tela
    sElement.style.transform = `rotate(${sDeg}deg)`;
    mElement.style.transform = `rotate(${mDeg}deg)`;
    hElement.style.transform = `rotate(${hDeg}deg)`;
}

function fixZero(time){
    //adiciona um zero a mais, caso o número seja menor do que 10
    return time < 10 ? `0${time}` : time;
}

//chama a função de atualizar o relógio a cada 1 segundo
setInterval(updateClock, 1000);
//inicia a função de atualizar o código
updateClock();