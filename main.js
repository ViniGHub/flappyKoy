// Declaração sprites
const spriteKoy = new Image();
spriteKoy.src = './Images/Koy.png';

const spriteChao = new Image();
spriteChao.src = './Images/chao.png';

const spriteFundo = new Image();
spriteFundo.src = './Images/fundo.jpg';

const spriteReady = new Image();
spriteReady.src = './Images/getReadyTela.png';

const spriteReinicia = new Image();
spriteReinicia.src = './Images/reinicia.png'
// fim Declaração sprites

// Sons 
const somPulo = new Audio();
somPulo.src = './audio/jump.mp3';
somPulo.playbackRate = "3.5";
somPulo.volume = ".5"

const somImpacto = new Audio();
somImpacto.src = './audio/impacto.mp3';
somImpacto.playbackRate = "1";
somImpacto.volume = ".5"

// Fim sons


const canvas = document.querySelector("#flappyKoy");
const contexto = canvas.getContext("2d");

// Desenha Sprites
function setKoy() {
    const flappyKoy = {
        SX: 0,
        SY: 0,
        HeightS: 350,
        WidthS: 270,
        Width: 80,
        Height: 80,
        aceleracao: .035,
        velocidade: 0,
        pulo: 2.25,
        DX: (canvas.width / 5),
        DY: (canvas.height / 2),

        atualiza() {
            if (fazColisao(flappyKoy, globais.chao)) {
                mudaTela(Telas.Reinicio)
                somImpacto.play();

            } else {
                this.velocidade += this.aceleracao;

                this.DY += this.velocidade;
            }

        },

        pula() {
            this.velocidade = -this.pulo;
            somPulo.play();
        },

        desenha() {

            contexto.drawImage(
                spriteKoy,
                flappyKoy.SX, flappyKoy.SY,
                flappyKoy.WidthS, flappyKoy.HeightS,
                flappyKoy.DX, flappyKoy.DY,
                flappyKoy.Width, flappyKoy.Height
            );

        }

    };
    return flappyKoy;
}


function setChao() {
    const chao = {
        SX: 10,
        SY: 109,
        DX: 0,
        DY: canvas.height - 110,
        HeightS: 290,
        WidthS: 248,
        Width: canvas.width,
        Height: 320,

        desenha() {
            contexto.drawImage(
                spriteChao,
                this.SX, this.SY,
                this.WidthS, this.HeightS,
                this.DX, this.DY,
                this.Width, this.Height
            );

            contexto.drawImage(
                spriteChao,
                this.SX, this.SY,
                this.WidthS, this.HeightS,
                this.DX + chao.Width, this.DY,
                this.Width, this.Height
            )



        },

        chaoMove() {
            const movimento = 1;
            const resetChao = chao.Width;

            this.DX -= movimento;
            if (this.DX <= -(resetChao)) {
                this.DX = 0;
                console.log("ola");

            }
        }
    }
    return chao;
};


let fundo = {
    SX: 0,
    SY: 0,
    DX: 0,
    DY: 0,
    HeightS: 633,
    WidthS: 500,
    Width: 500,
    Height: canvas.height - 110,

    desenha() {
        contexto.drawImage(
            spriteFundo,
            this.SX, this.SY,
            this.WidthS, this.HeightS,
            this.DX, this.DY,
            this.Width, this.Height
        );
        contexto.drawImage(
            spriteFundo,
            this.SX, this.SY,
            this.WidthS, this.HeightS,
            this.DX + this.Width, this.DY,
            this.Width, this.Height
        );
        contexto.drawImage(
            spriteFundo,
            this.SX, this.SY,
            this.WidthS, this.HeightS,
            this.DX + this.Width * 2, this.DY,
            this.Width, this.Height
        );

    }
}

const getReady = {
    SX: 0,
    SY: 0,
    DX: 0,
    DY: 0,
    HeightS: 150,
    WidthS: 450,
    Width: 700,
    Height: 150,


    desenha() {
        this.DX = (canvas.width - this.Width) / 2;
        this.DY = (canvas.height - this.DY) / 2;
        contexto.drawImage(
            spriteReady,
            this.SX, this.SY,
            this.WidthS, this.HeightS,
            this.DX, this.DY,
            this.Width, this.Height
        );
    }
}

const reinicia = {
    SX: 0,
    SY: 0,
    DX: 0,
    DY: 0,
    HeightS: 60,
    WidthS: 450,
    Width: 450,
    Height: 60,


    desenha() {
        this.DX = (canvas.width - this.Width) / 2;
        this.DY = (canvas.height - this.DY) / 2;
        contexto.drawImage(
            spriteReinicia,
            this.SX, this.SY,
            this.WidthS, this.HeightS,
            this.DX, this.DY,
            this.Width, this.Height
        );
    }

}

// fim Desenha Sprites

// Colisão

function fazColisao(koy, obj) {
    const koyY = koy.DY + koy.Height;
    if (koyY >= obj.DY) {
        return true;
    } else

        return false;

}

// Fim colisao

// Telas
const globais = {};

let telaAtiva = {};

function mudaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
        
    }
}


const Telas = {
    Inicio: {
        inicializa() {
            globais.flappyKoy = setKoy();
            globais.chao = setChao();
            
        },

        desenha() {
            globais.chao.desenha();
            fundo.desenha();
            globais.flappyKoy.desenha();
            getReady.desenha();
        },

        atualiza() {
            globais.chao.chaoMove();
        },

        spaceDown() {
            mudaTela(Telas.Jogo)
            globais.flappyKoy.pula();

        }

    },

    Jogo: {
        desenha() {
            fundo.desenha();
            globais.chao.desenha();
            globais.flappyKoy.desenha();
        },

        atualiza() {
            globais.flappyKoy.atualiza();
            globais.chao.chaoMove();
        },

        spaceDown() {
            globais.flappyKoy.pula();

        },

    },

    Reinicio: {
        desenha() {
            fundo.desenha();
            globais.chao.desenha();
            globais.flappyKoy.desenha();
            reinicia.desenha();
        },

        rDown() {
            mudaTela(Telas.Inicio)

        }
    }

}

// fim Telas

function loop() {
    telaAtiva.desenha();

    if (telaAtiva.atualiza) {
        telaAtiva.atualiza();
    }


    requestAnimationFrame(loop);
}

window.addEventListener("keydown", function (tecla) {
    if (tecla.key == " " && telaAtiva.spaceDown) {
        telaAtiva.spaceDown();

    } else if (tecla.key == "r" && telaAtiva.rDown) {
        telaAtiva.rDown();
    }

    // console.log(tecla);
})

mudaTela(Telas.Inicio)
loop();