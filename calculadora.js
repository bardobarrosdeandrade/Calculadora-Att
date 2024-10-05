'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')
let resultados = document.getElementById('historico')

let NovoNumero = true;
let operador ;
let numeroAnterior;
resultados = [] // array para armazenar os resultados
let numeroAtual;

//verifica se o operador é diferente, se está vazio
const operacaoPendente = () => operador !== undefined;

    //inserir operacao no display
    const inserirOperacao = (evento) => atualizarDisplay(evento.target.textContent);
    operadores.forEach (operador => operador.addEventListener('click', inserirOperacao));


    const atualizarDisplayOperador = (texto) => {
        if(operador){
            display.textContent = texto;
            operador = false
        }else{
            display.textContent += texto;
        }
    }


//faz o calculo. -- numeroNovo = true; pra poder atualizar a tela e o calculo corretamente
const calcular = () => {
    if(operacaoPendente()){  //reclace pra trocar a virgula por ponto
         numeroAtual = parseFloat(display.textContent);
        NovoNumero = true;
        
        if(operador === '+'){
            atualizarDisplay(numeroAnterior + numeroAtual)
        }else if(operador === '-'){
            atualizarDisplay(numeroAnterior - numeroAtual)
        }else if(operador === '*'){
            atualizarDisplay(numeroAnterior * numeroAtual)
        }else if(operador === '/'){
            atualizarDisplay(numeroAnterior / numeroAtual)
        }
        adicionarResultado(display.textContent);
        
        
    }}
    
    const atualizarDisplay = (texto) => {
        if(NovoNumero){
            display.textContent = texto.toLocaleString('BR');
            NovoNumero = false;
        }else{
            display.textContent += texto.toLocaleString('BR');
        }
        
    }
    const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
    //para buscar os numeros no display = inserir o evento em cada tecla do numero
    numeros.forEach(numero => numero.addEventListener('click', inserirNumero));
    
    const selecionarOperador = (evento) => {
        if(!NovoNumero){
            calcular()
            NovoNumero = true;
            operador = evento.target.textContent;
            numeroAnterior = parseFloat(display.textContent.replace(',','.'));
           
        }
    }
    operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));
    

    //operador = undefined p quando clicar em outro operador, nao realizar pra n bugar
    const ativarIgual = () => {
        calcular();
        operador = undefined
    }
    document.getElementById('igual').addEventListener('click', ativarIgual)
    
    
    //limpa display 'CE'
    const limparDisplay = () => display.textContent = "";
    document.getElementById('limparDisplay').addEventListener('click', limparDisplay);
    
    
    //limpa todo o calculo (zera a calculadora ) 'C'
    const limparCalculo = () => {
        limparDisplay();
        operador = undefined
        NovoNumero = true;
        numeroAnterior = undefined
    }
    document.getElementById('limparCalculo').addEventListener('click', limparCalculo);
    
    //remove somente o ultimo caracter 'X'
    //fazendo fatiação com slice, como o text contec retorna uma string, e a string é uma array de caractere, o slice pode ser usado pra remover o ultimo caractere
    const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
    document.getElementById('backspace').addEventListener('click', removerUltimoNumero);
    
    //usando o indexOf para procurar a string, se existe a virgula
    //decimal,impedindo que ocorra erros ao inserir o decimal. true quando existe decimal e false quando n existe

    const existeDecimal = () => display.textContent.indexOf(',') !== -1;
    //verificando se existe valor maior que 0
    const existeValor = () => display.textContent.length > 0;

    const inserirDecimal = () => {
        if(!existeDecimal()){
            atualizarDisplay(',');

        }
    }
    document.getElementById('decimal').addEventListener('click', inserirDecimal);

    
    const mapaTeclado = {
        '0'             : 'tecla0',
        '1'             : 'tecla1',
        '2'             : 'tecla2',
        '3'             : 'tecla3',
        '4'             : 'tecla4',
        '5'             : 'tecla5',
        '6'             : 'tecla6',
        '7'             : 'tecla7',
        '8'             : 'tecla8',
        '9'             : 'tecla9',
        '/'             : 'operadorDividir',
        '*'             : 'operadorMultiplicar',
        '-'             : 'operadorSubtrair',
        '+'             : 'operadorAdicionar',
        ','             : 'decimal',
        '='             : 'igual',
        'Enter'         : 'igual',
        'Backspace'     : 'backspace',
        'c'             : 'limparDisplay',
        'Escape'        : 'limparCalculo',
        ','             : 'decimal'
        
    }
    
    const mapearTeclado = (evento) => {
        const tecla = evento.key;
        
        const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
        if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
        
        
    }
    document.addEventListener('keydown', mapearTeclado);
    


    const dataHora = new Date().toLocaleString( {
        DateStyle: 'full',
        timeStyle: 'long'
    });


    function adicionarResultado(resultado) {
        resultados.push(dataHora + " ==> " +numeroAnterior+operador+numeroAtual + " = " +resultado);
        //função p atualizar a exibição do historico
        atualizarHistorico();
        
        
        
    }

    

    function atualizarHistorico(){
        const historico = document.getElementById('historico');
        historico.innerHTML = ''; //limpa o historico antes de atualizar
        resultados.forEach(resultado => {
            const li = document.createElement('li');
            li.textContent = resultado;
            historico.appendChild(li);
        })
    }
    

