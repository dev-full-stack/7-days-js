//inicial data
currentQuestion = 0;
correctAnswers = 0;

showQuestion()

//events

//adiciona o evento no botão de resetar o quiz
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//functions
function showQuestion(){
    //verifica se existe a questão
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        //faz o cálculo para a barra verde aparecer, calculo de porcentagem
        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        //mostra a pergunta na tela
        document.querySelector('.question').innerHTML = q.question;
        //oculta a div de score
        document.querySelector('.scoreArea').style.display = 'none';
        //mostra a div de questão
        document.querySelector('.questionArea').style.display = 'block';
    
        //limpa as opções
        document.querySelector('.options').innerHTML = '';

        let optionsHtml = '';
        //percorre a lista de respostas e armazena na variável optionsHtml
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        //mostra as respostas na tela
        document.querySelector('.options').innerHTML = optionsHtml
        //adiciona o evento de click na resposta
        document.querySelectorAll('.options .option').forEach(item => item.addEventListener('click', optionClickEvent));
    }else{
        finishQuiz();
    }
}

function finishQuiz(){
    //calcula a média de acertos
    points = Math.floor((correctAnswers / questions.length) * 100);

    //verifica a quantidade de acertos e muda conforme o resultado
    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = "Tá ruim hein?!";
        document.querySelector('.scorePct').style.color = 'red';
    }else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = "Muito bom!";
        document.querySelector('.scorePct').style.color = 'yellow';
    }else if(points >= 70){
        document.querySelector('.scoreText1').innerHTML = "Parabéns";
        document.querySelector('.scorePct').style.color = '0d630d';
    }

    //atualiza as informações na tela
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`

    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent(){
    //zera a questão atual e o número de questões corretas
    currentQuestion = 0;
    correctAnswers = 0;
    //chama a função de mostrar na tela
    showQuestion();
}

function optionClickEvent(e){
    //seleciona a opção clicada e armazena o data-op na variável
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    //verifica se a resposta selecionada confere com a resposta correta
    if(questions[currentQuestion].answer === clickedOption){
        //adiciona mais um nas questões corretas
        correctAnswers ++;
    }
    //muda para próxima questão
    currentQuestion++;
    //chama a função de mostrar as questões
    showQuestion();
}

