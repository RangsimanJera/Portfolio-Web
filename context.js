let aboutContext = '<div id="vanta"></div>' +
                    '<div class="report">' +
                        '<div class="text">About Me</div>' +
                        '<div class="pic pic--1" target="">' +
                            '<img src="./img/me.jpg" alt="">' +
                        '</div>' +
                        '<div class="pic pic--2" target="">' +
                            '<div class="context">' +
                                '<div class="name">รังสิมันตุ์ จีรบรรเจิดชัย</div>' +
                                '<div class="title">EDUCATION</div>' +
                                '<div class="paragraph">' +
                                    'ประถม: โรงเรียนกุหลาบวิทยา GPAX 4.00 <br>' +
                                    'มัธยมต้น: โรงเรียนสวนกุหลาบวิทยาลัย GPAX 3.99 <br>' +
                                    'มัธยมปลาย: โรงเรียนสวนกุหลาบวิทยาลัย GPAX 3.95 <br>' +
                                    'มหาวิทยาลัย: วิศวกรรมศาสตร์ ภาควิชาวิศวกรรมคอมพิวเตอร์ <br>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี' +
                                '</div>' +
                                '<div class="title">SKILLS</div>' +
                                '<div class="paragraph">' +
                                    'Code: C Python HTML CSS JavaScript <br>' +
                                    'Graphic: Adobe Photoshop Adobe Animate <br>' +
                                    'Game Dev: Unity Construct 2 Scratch <br>' +
                                    'More: Arduino SketchUp Blender' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

let project1Context = '<div id="vanta"></div>' +
                    '<div class="report">' +
                        '<div class="text">Searching | Thai Pharmacopoeia</div>' +
                        '<div class="pic pic--1 fixed" target="">' +
                            '<div class="context">' +
                                '<div class="name">เว็บค้นหาตำรับยาแผนไทย <br> จากอาการ</div>' +
                                '<div class="title">เหรียญเงิน Thailand New Gen Inventors Award 2023</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="pic pic--2" target="">' +
                            '<div class="box">' +
                                '<img src="./img/thaiPharmacopoeia.jpg" alt="">' +
                                '<a href="http://treatsymptoms-thaimedicine.netlify.app/" class="light" target="_blank" rel="noopener noreferrer">Explore now</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

let project2Context = '<div id="vanta"></div>' +
                    '<div class="report">' +
                        '<div class="text">Smart Pedestrian Button</div>' +
                        '<div class="pic pic--1" target="">' +
                            '<div class="box">' +
                                '<img src="./img/pedestrianButton.jpg" alt="">' +
                                '<a href="https://youtu.be/d-astBYvLZIpe" class="dark" target="_blank" rel="noopener noreferrer">Explore now</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

const competitionUrl = 'https://script.google.com/macros/s/AKfycbwd4lZ2bGMIMPHHPSuE0yZ0uiouNwpEsnWNfsNaBTIyFmSld4S9XJI3PpMDTu8wfESN/exec';
const activityUrl = 'https://script.google.com/macros/s/AKfycbzWdchHDtnlhaJyr0PIgdA2sinV-NN0rowo_e_A4p_fh0S3SZblT3nhZ4sF7unP7Fwn/exec';
const moreUrl = 'https://script.google.com/macros/s/AKfycbzPJn70CNxJiuBeqUZob5bjytjcQs59WDP5uTzJlJv3Lhi7jXzqEsCppk4deW9MiIfh/exec'
let Data = [];
let competitionDataText
let activityDataText
let moreDataText
let num = 1
let competitionContext
let activityContext
let moreContext

fetch(competitionUrl).then((data) => {
    return data.json();
}) .then((data) => {
    Data = data.data;
    competitionCreate();
})


function competitionCreate() {
    num = 1
    for (let i = 0; i < Data.length; i ++) {
        if (i === 0) {
            competitionDataText = '<div class="pic pic--' + num + '" target="' + Data[i].passage + '">' +
                    '<img src="' + Data[i].img + '" alt="">' +
                    '</div>'
        } else {
            competitionDataText = competitionDataText + '<div class="pic pic--' + num + '" target="' + Data[i].passage + '">' +
            '<img src="' + Data[i].img + '" alt="">' +
            '</div>'
        }
        num ++
        if (num > 4) num = 1
    }

    competitionContext = '<div id="vanta"></div>' +
                        '<div class="gallery">' +
                            '<div class="text">Activity</div>' +
                            competitionDataText + 
                        '</div>'
}

fetch(activityUrl).then((data) => {
    return data.json();
}) .then((data) => {
    Data = data.data;
    activityCreate();
})


function activityCreate() {
    num = 1
    for (let i = 0; i < Data.length; i ++) {
        if (i === 0) {
            activityDataText = '<div class="pic pic--' + num + '" target="' + Data[i].passage + '">' +
                    '<img src="' + Data[i].img + '" alt="">' +
                    '</div>'
        } else {
            activityDataText = activityDataText + '<div class="pic pic--' + num + '" target="' + Data[i].passage + '">' +
            '<img src="' + Data[i].img + '" alt="">' +
            '</div>'
        }
        num ++
        if (num > 4) num = 1
    }

    activityContext = '<div id="vanta"></div>' +
                        '<div class="gallery">' +
                            '<div class="text">Activity</div>' +
                            activityDataText + 
                        '</div>'
}

fetch(moreUrl).then((data) => {
    return data.json();
}) .then((data) => {
    Data = data.data;
    moreCreate();
})


function moreCreate() {
    num = 1
    for (let i = 0; i < Data.length; i ++) {
        if (i === 0) {
            if (Data[i].link !== "") {
                moreDataText = '<div class="pic pic--' + num + '" target="' + Data[i].passage + '">' +
                                    '<div class="box">' +
                                        '<img src="' + Data[i].img + '" alt="">' +
                                        '<a href="' + Data[i].link + '" class="' + Data[i].color + '" target="_blank" rel="noopener noreferrer">Explore now</a>' +
                                    '</div>' +
                                '</div>'
            } else {
                moreDataText = '<div class="pic pic--' + num + '" target="' + Data[i].passage + '">' +
                                    '<img src="' + Data[i].img + '" alt="">' +
                                '</div>'
            }
                                
                        
        } else {
            if (Data[i].link !== "") {
                moreDataText = moreDataText + '<div class="pic pic--' + num + '" target="' + Data[i].passage + '">' +
                                    '<div class="box">' +
                                        '<img src="' + Data[i].img + '" alt="">' +
                                        '<a href="' + Data[i].link + '" class="' + Data[i].color + '" target="_blank" rel="noopener noreferrer">Explore now</a>' +
                                    '</div>' +
                                '</div>'
            } else {
                moreDataText = moreDataText + '<div class="pic pic--' + num + '" target="' + Data[i].passage + '">' +
                                    '<img src="' + Data[i].img + '" alt="">' +
                                '</div>'
            }
        }
        num ++
        if (num > 4) num = 1
    }

    moreContext = '<div id="vanta"></div>' +
                        '<div class="gallery">' +
                            '<div class="text">more</div>' +
                            moreDataText + 
                        '</div>'
}