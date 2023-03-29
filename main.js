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

// Os doente

// Gigo
const spriteGigo = new Image();
spriteGigo.src = './Images/gigo.png';


// Jame
const spritejame =  new Image();
spritejame.src = './Images/jame.png';

// Mon
const spriteMon = new Image();
spriteMon.src = './images/mon.png';

const spriteMon1 = new Image();
spriteMon1.src = './images/mon1.png';

const spriteMon2 = new Image();
spriteMon2.src = './images/mon2.png';

// Borg
const spriteCorg = new Image();
spriteCorg.src = './Images/Corg.png';

const spriteGroc = new Image();
spriteGroc.src = './Images/Groc.png';

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

const somPoint = new Audio();
somPoint.src = './audio/point.mp3';
somPoint.playbackRate = "1.5";
somPoint.volume = ".5"

// Fim sons

// variaveis gerais
let personEsc = "koki";
let velocidadeGame = 5;
let aceleracaoGame = 0.1;
let chaoAdd = 0;
let pontos = 0;
let maioPont = 0;
let score = document.querySelector('#score');

let Escolheu = false;
let btnEsc = document.querySelector('#btnPerson');
let person = document.querySelector('#person');
let telaPerson = document.querySelector('#telaPerson');

let frames = 0;
const canvas = document.querySelector("#flappyKoy");
const contexto = canvas.getContext("2d");
// canvas.height = window.innerHeight;
// canvas.width = window.innerWidth;


// Fim variaveis gerais

// Definição personagem
btnEsc.addEventListener('click', function () {
    personEsc = person.value;

    if (personEsc != "") {
        telaPerson.style.top = '-1000px';
        score.style.opacity = '1';
        Escolheu = true;
    }

})

// Fim Definição personagem

// Desenha Sprites
function setKoy() {
    const flappyKoy = {
        SX: 0,
        SY: 0,
        HeightS: 735,
        WidthS: 600,
        Width: 150,
        Height: 150,
        aceleracao: aceleracaoGame,
        velocidade: 0,
        pulo: 2.5,
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

        definePerson() {
            if (personEsc == "koki") {
                this.movimentos = [
                    spriteKoy,
                    spriteKoy1,
                    spriteKoy2
                ];
                chaoAdd = 55;
                return this.movimentos;
            }

            if (personEsc == "mon") {
                this.movimentos = [
                    spriteMon,
                    spriteMon1,
                    spriteMon2
                ]
                this.WidthS = 875;
                this.HeightS = 500;
                this.Height = 100;
                this.Width = 100;
                chaoAdd = 20;
                return this.movimentos;
            }

            if (personEsc == "gigo") {
                this.movimentos = [
                    spriteGigo,
                    spriteGigo,
                    spriteGigo
                ]
                this.WidthS = 320;
                this.HeightS = 315;
                this.Height = 100;
                this.Width = 100;
                chaoAdd = 20;
                return this.movimentos;
            }

            if (personEsc == "jame") {
                this.movimentos = [
                    spritejame,
                    spritejame,
                    spritejame
                ]

                this.WidthS = 490;
                this.HeightS = 630;
                this.Height = 100;
                this.Width = 100;
                chaoAdd = 20;

                return this.movimentos;
            }
        },

        baseIncremento: 1,
        attFrame() {
            const intervaloFrame = 15;
            const passouInt = frames % intervaloFrame;

            if (passouInt == 0) {

                if (this.frameAtual == this.movimentos.length - 1) {
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
            contexto.fillStyle= 'red';
            contexto.strokeRect(this.DX, this.DY, this.Width, this.Height);
            contexto.fill();

            this.definePerson();
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
            const moveChao = velocidadeGame;
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
        this.borgBottom.DX -= velocidadeGame;
        this.borgTop.DX -= velocidadeGame;

        if (this.borgBottom.DX == -200) {
            this.borgBottom.DX = canvas.width;
            this.borgTop.DX = canvas.width;
            this.borgBottom.DY = Math.round((Math.random() * 500) + 300);
            this.borgTop.DY = this.borgBottom.DY - 750;

        }
        if (this.borgBottom.DX == 270) {
            pontos++;
            score.innerHTML = pontos;
            somPoint.play();
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
    if (koyY >= obj.DY + chaoAdd) {
        return true;
    } else
        return false;

}

function ColideCorg(koy, obj) {
    const koyX = koy.DX + koy.Width;
    const koyY = koy.DY + koy.Height;

    if (koyX > obj.borgTop.DX + chaoAdd &&
        koyX < obj.borgTop.DX + obj.borgTop.Width &&
        koy.DY < obj.borgTop.DY + obj.borgTop.Height - chaoAdd) {
        return true;
    } else if (koyX > obj.borgBottom.DX + chaoAdd &&
        koyX < obj.borgBottom.DX + obj.borgBottom.Width &&
        koyY > obj.borgBottom.DY + chaoAdd) {
        return true;

    } else {
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
            if (Escolheu) {
                mudaTela(Telas.Jogo)
                globais.flappyKoy.pula();
            }


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
    contexto.clearRect(0, 0, 2000, 2000);

    if (telaAtiva.desenha && Escolheu) {
        telaAtiva.desenha();
    }

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
    } else if (tecla.key == "p") {
        this.location.reload();
    }

})

mudaTela(Telas.Inicio)
loop();