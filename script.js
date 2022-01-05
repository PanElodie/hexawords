var points = [
    // 0
    {id : 1, x : 0, y : 50},
    {id : 2, x : 25, y : 40},
    {id : 3, x : 42, y : 17},
    {id : 4, x : 42, y : -16},
    {id : 5, x : 25, y : -40},
    {id : 6, x : 0, y : -50},
    {id : 7, x : -25, y : -40},
    {id : 8, x : -41, y : -16},
    {id : 9, x : -41, y : 16},
    {id : 10, x : -25, y : 40},

    // D
    {id : 11, x : -41, y : -116},
    {id : 12, x : -9, y : -116},
    {id : 13, x : 20, y : -125},
    {id : 14, x : 37, y : -150},
    {id : 15, x : 37, y : -175},
    {id : 16, x : 20, y : -200},
    {id : 17, x : -9, y : -216},
    {id : 18, x : -41, y : -216},
    {id : 19, x : -41, y : -191},
    {id : 20, x : -41, y : -166},
    {id : 21, x : -41, y : -141},

    // 7
    {id : 22, x : -34, y : 97.5},
    {id : 23, x : -11, y : 97.5},
    {id : 24, x : 11, y : 97.5},
    {id : 25, x : 35, y : 97.5},
    {id : 26, x : 35, y : 118},
    {id : 27, x : 21, y : 135},
    {id : 28, x : 2.5, y : 152.5},
    {id : 29, x : -12.5, y : 169},
    {id : 30, x : -27.5, y : 186},

    // #
    {id : 31, x : -192, y : 50},
    {id : 32, x : -150, y : 50},
    {id : 33, x : -184, y : 25},
    {id : 34, x : -141, y : 25},
    {id : 35, x : -175, y : 3},
    {id : 36, x : -134, y : 3},
    {id : 37, x : -166, y : -25},
    {id : 38, x : -124, y : -25},
    {id : 39, x : -159, y : -50},
    {id : 40, x : -116, y : -50},
    {id : 41, x : -186, y : -25},
    {id : 42, x : -104, y : -25},
    {id : 43, x : -209, y : -25},
    {id : 44, x : -80, y : -25},
    {id : 45, x : -204, y : 25},
    {id : 46, x : -115, y : 25},
    {id : 47, x : -225, y : 25},
    {id : 48, x : -90, y : 25},
    {id : 49, x : -161, y : 25},
    {id : 50, x : -145, y : -25}
];

var points_desktop = [];

points.forEach(e => {
    points_desktop.push({id : e.id, x : e.x / 1.25, y : e.y / 1.25})
})

var dot;
var size;
var coord;
var audio;
var forme;
var positionSectionDeux;
var time;

// L'écran a une largeur supérieure à 620px
function reSize(){
    if (window.innerWidth > 620) {
        dot = 5;
        size = 2;
        coord = points_desktop;
    } else {
        dot = 7;
        size = 1;
        coord = points;
    }
}

reSize();

// Quand l'écran est dedimensionné
window.addEventListener('resize', function(){
    reSize();
    document.querySelector('defs').innerHTML = `<circle id="dot" r="${dot}"></circle>`;

    document.querySelectorAll('.section-1 use').forEach(e => {
        for (let point of coord) {
            if (e.id == point.id) {
                e.style.transform = `translate(${point.x}px,${point.y}px)`;
            }
        }
    })
})


// Le rayon des points varie en fonction de la largeur de l'écran
document.querySelector('svg').innerHTML += `<defs><circle id="dot" r="${dot}"></circle></defs>`;

setTimeout(e => {
    // le background-color de la section 1 devient rose
    document.querySelector('.section-1').style.backgroundColor = "#d07";
    document.querySelector('.section-1 .explosion').remove();

    for (let point of coord) {
        document.querySelector('.section-1 svg').innerHTML += "<use href='#dot' id='" + point.id + "' style='fill:#fff'></use>";
    }

    setTimeout(() => {
        document.querySelectorAll('.section-1 use').forEach(e => {
            for (let point of coord) {
                if (e.id == point.id) {
                    e.style.transform = `translate(${point.x}px,${point.y}px)`;
                }
            }
        })
    }, 500);
}, 5500);

// Flèche
setTimeout(() => {
    document.querySelector('.arrow-1').style.display = "block";
    document.querySelector('.section-2').style.display = "block";
    
    
    positionSectionDeux = document.querySelector('.section-2').offsetTop;

    window.addEventListener('scroll', () => {
        if (window.scrollY > positionSectionDeux - 20) {
            document.querySelectorAll('.line-1, .line-2, .line-3').forEach(e => {
                e.classList.add('animation-speaker');
            })

            setTimeout(() => {
                document.querySelector('.speaker').classList.add('move-speaker');
                document.querySelector('.section-3').style.display = "flex";
                document.querySelector('footer').style.display = "block";

                document.querySelectorAll('.cat, .music, .sheep').forEach(a => {
                    a.style.display = "block";

                    a.addEventListener('click', b => {
                        time = 2000;
                        
                        document.querySelectorAll('.cat, .music, .sheep').forEach(c => {
                            c.style.display = "none";
                        })

                        if (b.target.parentElement.parentElement.classList.contains('sheep')) {

                            audio = new Audio('medias/sheep.mp3');
                            forme = "sheep";
                            
                        } else if (b.target.parentElement.parentElement.classList.contains('cat')) {

                            audio = new Audio('medias/cat.mp3');
                            forme = "cat";

                        } else {

                            audio = new Audio('medias/music.mp3');
                            forme = "music";
                            time = 4300;

                            document.querySelector('.stave').style.display = 'block';
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += '<use href="#dot" x=-290 y=-197></use>'
                            }, 170);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += '<use href="#dot" x=-260 y=-216></use>'
                            }, 200);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += `<g>
                                    <use href="#dot" x=-240 y=-255></use>
                                    <line x1="-250" y1="-253" x2="-230" y2="-257" stroke="black" />
                                </g>`
                            }, 450);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += `<g>
                                <use href="#dot" x=-190 y=-256></use>'
                                <use href="#sharp" transform='translate(-210, -252)'></use>
                                </g>`
                            }, 860);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += `<g>
                                    <use href="#dot" x=-164 y=-267></use>
                                    <line x1="-174" y1="-265" x2="-154" y2="-269" stroke="black" />
                                </g>`
                            }, 1200);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += `<g>
                                    <use href="#dot" x=-126 y=-263></use>
                                    <use href="#sharp" transform='translate(-141, -260)'></use>
                                </g>`
                            }, 1500);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += `<g>
                                    <use href="#dot" x=-99 y=-276></use>
                                    <line x1="-109" y1="-274" x2="-89" y2="-278" stroke="black" />
                                </g>`
                            }, 2000);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += '<use href="#dot" x=-73 y=-257></use>'
                            }, 2400);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML += `<g>
                                    <use href="#dot" x=-48 y=-281></use>
                                    <line x1="-58" y1="-279" x2="-38" y2="-283" stroke="black" />
                                </g>`
                            }, 2900);
                            setTimeout(() => {
                                document.querySelector('.notes').innerHTML +='  <use href="#dot" x=-18 y=-258></use>'
                            }, 3500);
                            
                        }

                        document.querySelector(`.${forme}`).style.display = 'block';
                        document.querySelector(`.${forme}`).classList.add('highlight-form');

                        setTimeout(() => {

                            document.querySelector(`.${forme}`).classList.remove('highlight-form');
                            document.querySelectorAll('.cat, .music, .sheep').forEach(c => {
                                c.style.display = 'block';
                            })

                            document.querySelector('.stave').style.display = "none";
                            document.querySelector('.notes').innerHTML = '';
                        }, time)
                        
                        audio.play();
                    });

                })

            }, 3000)

        }

    })

}, 8000);