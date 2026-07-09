botao
const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia'); 

Senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+~`|}{[]:;?><,./-=\\';

let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

funcao botao
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho; 

geraSenha();

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha(); 
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha(); 
}

function geraSenha() {
    let alfabeto = '';
    
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

  
    if (alfabeto.length === 0) {
        campoSenha.value = "Selecione uma opção";
        classificaSenha(0);
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    if (tamanhoAlfabeto === 0) {
        forcaSenha.classList.remove('fraca', 'media', 'forte');
        valorEntropia.textContent = "Um computador pode levar 0 dias.";
        return;
    }

   
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log("Entropia atual:", entropia);

    
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia <= 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    let diasParaQuebrar = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
    
    if (diasParaQuebrar > 1000000) {
        valorEntropia.textContent = "Um computador pode levar milhões de dias para descobrir essa senha.";
    } else {
        valorEntropia.textContent = "Um computador pode levar até " + diasParaQuebrar + " dias para descobrir essa senha.";
    }
}