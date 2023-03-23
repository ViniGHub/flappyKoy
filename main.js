// Declaração sprites
const spriteKoy = new Image();
spriteKoy.src = './Images/Koy.png';

const spriteKoy1 = new Image();
spriteKoy1.src = './Images/Koy1.png';

const spriteKoy2 = new Image();
spriteKoy2.src = './Images/Koy2.png';

const spriteChao = new Image();
spriteChao.src = './Images/chao.png';

const spriteFundo = new Image();
spriteFundo.src = './Images/fundo.jpg';

const spriteReady = new Image();
spriteReady.src = './Images/getReadyTela.png';

const spriteReinicia = new Image();
spriteReinicia.src = './Images/reinicia.png';

const spriteCorg = new Image();
spriteCorg.src = './Images/Corg.png'

const spriteGroc = new Image();
spriteGroc.src = './Images/Groc.png'
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

let pontos = 0;
let score = document.querySelector('#score');
let frames = 0;
const canvas = document.querySelector("#flappyKoy");
const contexto = canvas.getContext("2d");

// Desenha Sprites
function setKoy() {
    const flappyKoy = {
        SX: 0,
        SY: 0,
        HeightS: 735,
        WidthS: 600,
        Width: 150,
        Height: 200,
        aceleracao: .2,
        velocidade: 0,
        pulo: 5,
        DX: (canvas.width / 5),
        DY: (canvas.height / 2),

        atualiza() {
            if (ColideChao(flappyKoy, globais.chao) || ColideCorg(flappyKoy, corg[0]) || ColideCorg(flappyKoy, corg[1]) || ColideCorg(flappyKoy, corg[2]) || ColideCorg(flappyKoy, corg[3])) {
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

        frameAtual: 1,

        movimentos: [
            spriteKoy,
            spriteKoy1,
            spriteKoy2
        ],

        baseIncremento: 1,
        attFrame() {
            const intervaloFrame = 10;
            const passouInt = frames % intervaloFrame;

            if (passouInt == 0) {

                if (this.frameAtual == 2) {
                    this.baseIncremento = -1;
                } else if (this.frameAtual == 0) {
                    this.baseIncremento = 1;
                }
                const incremento = this.baseIncremento + this.frameAtual;
                const baseRepet = this.movimentos.length;
                this.frameAtual = incremento % baseRepet;

            }

        },

        desenha() {

            this.attFrame();
            contexto.drawImage(
                this.movimentos[this.frameAtual],
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
            const moveChao = 5;
            const resetChao = chao.Width;

            this.DX -= moveChao;
            if (this.DX <= -(resetChao)) {
                this.DX = 0;

            }
        }
    }
    return chao;
};

class Corg {
    borgBottom = {
        SX: 0,
        SY: 0,
        DX: canvas.width,
        DY: Math.round((Math.random() * 500) + 300),
        HeightS: 680,
        WidthS: 270,
        Width: 150,
        Height: 600,
    }

    borgTop = {
        SX: 0,
        SY: 0,
        DX: canvas.width,
        DY: this.borgBottom.DY - 750,
        HeightS: 680,
        WidthS: 270,
        Width: 150,
        Height: 600,
    }

    desenha() {
        if (this.borgTop.DY <= -590) {
            this.borgTop.DY = -580;
            this.borgBottom.DY = this.borgTop.DY + 750;
        } else if (this.borgBottom.DY >= 780) {
            this.borgBottom.DY = 770;
            this.borgTop.DY = this.borgBottom.DY - 750;

        }

        contexto.drawImage(
                spriteCorg,
                this.borgBottom.SY, this.borgBottom.SX,
                this.borgBottom.WidthS, this.borgBottom.HeightS,
                this.borgBottom.DX, this.borgBottom.DY,
                this.borgBottom.Width, this.borgBottom.Height
            ),

            contexto.drawImage(
                spriteGroc,
                this.borgTop.SY, this.borgTop.SX,
                this.borgTop.WidthS, this.borgTop.HeightS,
                this.borgTop.DX, this.borgTop.DY,
                this.borgTop.Width, this.borgTop.Height
            )
    };

    moveCorg() {
        this.borgBottom.DX -= 5;
        this.borgTop.DX -= 5;

        if (this.borgBottom.DX == -200) {
            this.borgBottom.DX = canvas.width;
            this.borgTop.DX = canvas.width;
            this.borgBottom.DY = Math.round((Math.random() * 600) + 300);
            this.borgTop.DY = this.borgBottom.DY - 750;

            console.log(this.borgTop.DY);
        }
        if (this.borgBottom.DX == 200) {
            console.log(pontos);
            pontos++;
            score.innerHTML = pontos;
        }

    }

};

let corg = [new Corg(), new Corg(), new Corg(), new Corg()];

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

function ColideChao(koy, obj) {
    const koyY = koy.DY + koy.Height;
    if (koyY >= obj.DY + 80) {
        return true;
    } else
        return false;

}

function ColideCorg(koy, obj) {
    const koyX = koy.DX + koy.Width;
    const koyY = koy.DY + koy.Height;

    if (koyX > obj.borgTop.DX + 50 &&
        koyX < obj.borgTop.DX + obj.borgTop.Width &&
        koyY < obj.borgTop.DY + obj.borgTop.Height + 150) {
        return true;
    }else if (koyX > obj.borgBottom.DX + 50 &&
        koyX < obj.borgBottom.DX + obj.borgBottom.Width &&
        koyY > obj.borgBottom.DY +100) {
        return true;

    }else {
        return false;
    }

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
            corg[0].desenha();
            corg[1].desenha();
            corg[2].desenha();
            corg[3].desenha();
            globais.chao.desenha();
            globais.flappyKoy.desenha();

        },

        atualiza() {
            corg[0].moveCorg();
            if (corg[0].borgBottom.DX <= 900 || corg[1].borgBottom.DX != canvas.width) {
                corg[1].moveCorg();
            }
            if (corg[1].borgBottom.DX <= 900 || corg[2].borgBottom.DX != canvas.width) {
                corg[2].moveCorg();
            }
            if (corg[2].borgBottom.DX <= 900 || corg[3].borgBottom.DX != canvas.width) {
                corg[3].moveCorg
            }
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
            corg[0].desenha();
            corg[1].desenha();
            corg[2].desenha();
            corg[3].desenha();
            globais.chao.desenha();
            globais.flappyKoy.desenha();
            reinicia.desenha();
        },

        rDown() {
            mudaTela(Telas.Inicio)
            corg.forEach(element => {
                element.borgBottom.DX = canvas.width;
                element.borgTop.DX = canvas.width;
                pontos = 0;
                score.innerHTML = pontos;
            });


        }
    }

}

// fim Telas

function loop() {
    telaAtiva.desenha();

    if (telaAtiva.atualiza) {
        telaAtiva.atualiza();
    }

    frames++;
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