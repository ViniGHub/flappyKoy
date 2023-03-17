const spriteKoy = new Image();
spriteKoy.src = './Images/Koy.png';

const spriteChao = new Image();
spriteChao.src = './Images/chao.png';

const spriteFundo = new Image();
spriteFundo.src = './Images/fundo.jpg';

const canvas = document.querySelector("#flappyKoy");
const contexto = canvas.getContext("2d");

const flappyKoy = {
    koySX: 0, koySY: 0,
    koyDX: 335, koyDY: 385,
    koyHeightS: 350, koyWidthS: 270,
    koyWidth: 80, koyHeight: 80,
    aceleracao: .025, velocidade:0,

    gravidade() {
        this.velocidade += this.aceleracao;

        this.koyDY += this.velocidade;

    },

    desenhaKoy() {
        contexto.drawImage(
            spriteKoy,
            flappyKoy.koySX, flappyKoy.koySY,
            flappyKoy.koyWidthS, flappyKoy.koyHeightS,
            flappyKoy.koyDX, flappyKoy.koyDY,
            flappyKoy.koyWidth, flappyKoy.koyHeight
        );

    }

};

const chao = {
    chaoSX: 10, chaoSY: 109,
    chaoDX: 0, chaoDY: canvas.height - 110,
    chaoHeightS: 290, chaoWidthS: 300,
    chaoWidth: canvas.width, chaoHeight: 320,

    desenhaChao() {
        contexto.drawImage(
            spriteChao,
            this.chaoSX, this.chaoSY,
            this.chaoWidthS, this.chaoHeightS,
            this.chaoDX, this.chaoDY,
            this.chaoWidth, this.chaoHeight
        );

    }
}

const fundo = {
    fundoSX: 0, fundoSY: 0,
    fundoDX: 0, fundoDY: 0,
    fundoHeightS: 633, fundoWidthS: 500,
    fundoWidth: 500,  fundoHeight: canvas.height - 110,

    desenhaFundo() {
        contexto.drawImage(
            spriteFundo,
            this.fundoSX, this.fundoSY,
            this.fundoWidthS, this.fundoHeightS,
            this.fundoDX, this.fundoDY,
            this.fundoWidth, this.fundoHeight
        );
        contexto.drawImage(
            spriteFundo,
            this.fundoSX, this.fundoSY,
            this.fundoWidthS, this.fundoHeightS,
            this.fundoDX + this.fundoWidth, this.fundoDY,
            this.fundoWidth, this.fundoHeight
        );
        contexto.drawImage(
            spriteFundo,
            this.fundoSX, this.fundoSY,
            this.fundoWidthS, this.fundoHeightS,
            this.fundoDX + this.fundoWidth * 2, this.fundoDY,
            this.fundoWidth, this.fundoHeight
        );

    }
}


function loop() {
    flappyKoy.gravidade();

    fundo.desenhaFundo();
    chao.desenhaChao();
    flappyKoy.desenhaKoy();

    requestAnimationFrame(loop);
}


loop();