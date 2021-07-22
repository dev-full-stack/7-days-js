//seleciona o formulário e escuta o evento de submit, executando uma função assíncrona
let form = document.querySelector('.busca').addEventListener('submit', async (event) => {
    //previne o comportamento padrão do formulário
    event.preventDefault();

    //seleciona o input e pega o valor
    let input = document.querySelector('#searchInput').value;
    
    //verifica se o input não está vazio
    if(input !== ''){
        //limpa tela
        clearInfo();
        //mostra o carregando na tela
        showWarning('carregando...')

        //define a url do fetch
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d787a951a89ecbce2775fb2d473f1149&units=metric&lang=pt_br`;

        //executa a requisição de forma assíncrona
        let result = await fetch(url);
        //transorma o resultado em json
        let json = await result.json();

        //verifica o resultado
        if(json.cod === 200){
            //chama a função de mostrar os resultados na tela, passando um json com as principais informações
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            //limpa a tela e mostra a mensagem de erro
            clearInfo();
            showWarning(json.message);
        }
    }else{
        //limpa a tela
        clearInfo();
    }
});

//funcão de mostrar as informações e recebe o json como parâmetro
function showInfo(json){
    //limpa os avisos
    showWarning('');

    //seleciona os elementos html e mostra o resultado da api na tela
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}

//função para limpar a tela
function clearInfo(){
    //limpa os avisos
    showWarning('');
    //oculta a div de resultados
    document.querySelector('.resultado').style.display = 'none';
}

//função de mostrar os avisos
function showWarning(msg){
    //seleciona a div de avisos e modifica para o resultado
    document.querySelector('.aviso').innerHTML = msg;
}