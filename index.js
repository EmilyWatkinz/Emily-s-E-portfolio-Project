
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('clock-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 8;

    function drawClock() {
        ctx.clearRect(0, 0, w, h);
     
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();

        for (let i = 0; i < 60; i++) {
            const angle = (i * Math.PI / 30) - Math.PI/2;
            const len = i % 5 === 0 ? 14 : 6;
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = i % 5 === 0 ? '#222' : '#bbb';
            ctx.lineWidth = i % 5 === 0 ? 2.2 : 1.1;
            ctx.moveTo(cx + Math.cos(angle) * (radius - len), cy + Math.sin(angle) * (radius - len));
            ctx.lineTo(cx + Math.cos(angle) * (radius - 2), cy + Math.sin(angle) * (radius - 2));
            ctx.stroke();
            ctx.restore();
        }

      
        ctx.save();
        ctx.fillStyle = '#222';
        ctx.font = 'bold 18px Roboto, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let n = 1; n <= 12; n++) {
            const angle = (n * Math.PI / 6) - Math.PI/2;
            ctx.fillText(n.toString(), cx + Math.cos(angle) * (radius - 30), cy + Math.sin(angle) * (radius - 30));
        }
        ctx.restore();

      
        const now = new Date();
        const sec = now.getSeconds() + now.getMilliseconds() / 1000;
        const min = now.getMinutes() + sec / 60;
        const hr = now.getHours() % 12 + min / 60;

    
        ctx.save();
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 5.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
            cx + Math.cos((hr * Math.PI / 6) - Math.PI/2) * (radius - 60),
            cy + Math.sin((hr * Math.PI / 6) - Math.PI/2) * (radius - 60)
        );
        ctx.stroke();
        ctx.restore();

      
        ctx.save();
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
            cx + Math.cos((min * Math.PI / 30) - Math.PI/2) * (radius - 36),
            cy + Math.sin((min * Math.PI / 30) - Math.PI/2) * (radius - 36)
        );
        ctx.stroke();
        ctx.restore();

        // Second hand
        ctx.save();
        ctx.strokeStyle = '#e91e63';
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
            cx + Math.cos((sec * Math.PI / 30) - Math.PI/2) * (radius - 22),
            cy + Math.sin((sec * Math.PI / 30) - Math.PI/2) * (radius - 22)
        );
        ctx.stroke();
        ctx.restore();

      
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#e91e63';
        ctx.shadowColor = '#e91e63';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        drawClock();
        requestAnimationFrame(animate);
    }
    animate();
});

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('spiral-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
        const parent = canvas.parentElement;
        if (parent) {
            const size = Math.max(parent.offsetWidth, parent.offsetHeight);
            canvas.width = size;
            canvas.height = size;
        }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    let angleOffset = 0;
    function drawSpiral() {
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const spiralLength = 16 * Math.PI;
        const dotSpacing = 0.22;
        const baseRadius = 12;
        const spiralStep = 5.5;
        const dotRadius = 7;
        ctx.clearRect(0, 0, w, h);
        let theta = 0;
        while (theta < spiralLength) {
            const r = baseRadius + spiralStep * theta;
            const a = theta + angleOffset;
            const x = cx + r * Math.cos(a);
            const y = cy + r * Math.sin(a);
            ctx.save();
            ctx.globalAlpha = 0.7;
            ctx.shadowColor = '#00ff6a';
            ctx.shadowBlur = 18;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
            ctx.fillStyle = 'lime';
            ctx.fill();
            ctx.restore();
            theta += dotSpacing;
        }
    }
    function animate() {
        angleOffset += 0.008;
        drawSpiral();
        requestAnimationFrame(animate);
    }
    animate();
});

document.addEventListener('DOMContentLoaded', function () {
    const smiley = document.querySelector('.fun-square--smiley');
    if (!smiley) return;
    const svg = smiley.querySelector('svg');
    const leftPupil = svg.querySelector('.left-eye-pupil');
    const rightPupil = svg.querySelector('.right-eye-pupil');
    const smileMouth = svg.querySelector('.smile-mouth');
    const oMouth = svg.querySelector('.o-mouth');
    const mouthHitbox = svg.querySelector('.mouth-hitbox');

   
    const eyeOrigin = { left: { x: 42, y: 55 }, right: { x: 78, y: 55 } };
    const pupilRadius = 6;
    const maxOffset = 4;

    function moveEyes(event) {
        const rect = smiley.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        const svgX = (mouseX / rect.width) * 120;
        const svgY = (mouseY / rect.height) * 120;
        [leftPupil, rightPupil].forEach((pupil, i) => {
            const origin = i === 0 ? eyeOrigin.left : eyeOrigin.right;
            const dx = svgX - origin.x;
            const dy = svgY - origin.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const angle = Math.atan2(dy, dx);
            const offset = dist > maxOffset ? maxOffset : dist;
            const newX = origin.x + Math.cos(angle) * offset;
            const newY = origin.y + Math.sin(angle) * offset;
            pupil.setAttribute('cx', newX);
            pupil.setAttribute('cy', newY);
        });
    }

    function resetEyes() {
        leftPupil.setAttribute('cx', eyeOrigin.left.x);
        leftPupil.setAttribute('cy', eyeOrigin.left.y);
        rightPupil.setAttribute('cx', eyeOrigin.right.x);
        rightPupil.setAttribute('cy', eyeOrigin.right.y);
    }

    smiley.addEventListener('mousemove', moveEyes);
    smiley.addEventListener('mouseleave', resetEyes);

    if (mouthHitbox) {
        mouthHitbox.addEventListener('mouseenter', function () {
            smileMouth.style.opacity = 0;
            oMouth.style.opacity = 1;
        });
        mouthHitbox.addEventListener('mouseleave', function () {
            smileMouth.style.opacity = 1;
            oMouth.style.opacity = 0;
        });
        // Set initial state
        smileMouth.style.opacity = 1;
        oMouth.style.opacity = 0;
    }
});
let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1/20;

function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; ++i) {
        const isOdd = i % 2 !== 0;
        const boolInt = isOdd ? -1 : 1;
      shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
     }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle)  {
        document.body.classList += " dark__theme"
    } 
    else {
        document.body.classList.remove("dark__theme");
    }
}


function contact() {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading');
    const success = document.querySelector('.modal__overlay--success');
    loading.classList += " modal__overlay--visible"
     emailjs
        .sendForm(
            'service_5bpn8ak',
            'template_iavynmu',
            event.target,
            'wi6ra8rOTt_-ijw2w'
        ).then(() => {
           loading.classList.remove("modal__overlay--visible");
           success.classList += " modal__overlay--visible";;
        }).catch(() => {
            loading.classList.remove("modal__overlay--visible");
            alert(
                "The email service is temporarily unavailable Please contact me directly at sewatkins16@gmail.com."
            )
    })
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove('modal--open');
    }
    isModalOpen = true;
    document.body.classList += ' modal--open';
}



document.addEventListener('DOMContentLoaded', () => {
    const fadeEls = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });
    fadeEls.forEach(el => observer.observe(el));
});