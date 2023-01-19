import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger 2

let scrollTrigger = ScrollTrigger.create({
    trigger: '#testTrigger',
    start: 'bottom bottom',
    toggleActions: "play pause resume pause",
    // scrub: 1,
    // end: 'bottom top',
    // onEnter: self => self.trigger.style.backgroundColor = '#0f172a',
    // onToggle: self => console.log(self.isActive),
    animation: gsap.to('#testTrigger', {
        borderRadius: '100%',
        scale: 0.5,
        duration: 2
    })
    // onUpdate: self => {
    //     console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
    //   }
});

// ScrollTrigger 

const testTitle = document.getElementById('testTitle');

let tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: '.gsap-test7-1',
        start: 'bottom bottom',
        // end: '+=500'
        // pin: true
        scrub: 1,
        snap: {
            snapTo: 0.33,
            duration: 0.3,
            delay: 0,
            ease: 'power1.inOut'
        }
    },
    defaults: {
        ease: 'power1.inOut',
        backgroundColor: '#0f172a',
        borderRadius: '100%',
    }
});

tl4
    .addLabel('start')
    .to('.gsap-test7-1', {
        x: 200
    })
    .addLabel('middle')
    .to('.gsap-test7-2', {
        x: -200
    })
    .addLabel('end')
    .to('.gsap-test7-3', {
        y: -250
    });

// gsap.to('.gsap-test7-1', {
//     scrollTrigger: '.gsap-test7-1',
//     x: 200,
//     backgroundColor: '#0f172a',
//     borderRadius: '100%',
//     duration: 1,
//     start: 'bottom bottom'
// })
// gsap.to('.gsap-test7-2', {
//     scrollTrigger: '.gsap-test7-1',
//     x: -200,
//     backgroundColor: '#0f172a',
//     borderRadius: '100%',
//     duration: 1,
//     start: 'bottom bottom'
// })
// gsap.to('.gsap-test7-3', {
//     scrollTrigger: '.gsap-test7-1',
//     y: -250,
//     backgroundColor: '#0f172a',
//     borderRadius: '100%',
//     duration: 1,
//     start: 'bottom bottom'
// })

// callbacks
const playButton2 = document.getElementById('play-2');

let tl3 = gsap.timeline({
    paused: true, defaults: {
        ease: 'power1.inOut',
        backgroundColor: '#0f172a',
        borderRadius: '100%',
        // onComplete, onStart, onUpdate, onRepeat, etc
        onComplete: () => document.getElementById('finished').style.visibility = 'visible'
    }
})

tl3.to('.gsap-test6-1', {
    x: 100,
    duration: 2,
})

playButton2.addEventListener('click', () => {
    tl3.play();
})

// timeline play, pause, etc
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const speedButton = document.getElementById('speed');

let tl2 = gsap.timeline({
    repeat: -1, yoyo: true, paused: true, defaults: {
        ease: 'power1.inOut',
        backgroundColor: '#0f172a',
        borderRadius: '100%'
    }
})

tl2.to('.gsap-test5-1', {
    x: 250,
    duration: 1,
})

playButton.addEventListener('click', () => {
    tl2.play();
})
pauseButton.addEventListener('click', () => {
    tl2.pause();
})
speedButton.addEventListener('click', () => {
    tl2.timeScale(gsap.getProperty(tl2, 'timeScale') + 1);
})

// timeline
let tl = gsap.timeline({
    repeat: -1, yoyo: true, defaults: {
        ease: 'power1.out',
        backgroundColor: '#0f172a',
        borderRadius: '100%'
    }
});

tl.to('.gsap-test4-1', {
    x: 40,
    scale: 0.5,
    duration: 1
}, 1)
tl.to('.gsap-test4-2', {
    y: 30,
    scale: 0.7,
    backgroundColor: '#232E47',
    duration: 2
}, '<0.2')
tl.to('.gsap-test4-3', {
    x: -40,
    scale: 0.5,
    duration: 3
}, '<0.4')

// delay
gsap.to('.gsap-test3-1', {
    rotation: 360,
    delay: 1,
    backgroundColor: '#0f172a',
    ease: 'power1.out',
    borderRadius: '100%',
    scale: 0.6
})
gsap.to('.gsap-test3-2', {
    rotation: 360,
    delay: 2,
    backgroundColor: '#0f172a',
    ease: 'power1.out',
    borderRadius: '100%',
    scale: 0.6
})
gsap.to('.gsap-test3-3', {
    rotation: 360,
    delay: 3,
    backgroundColor: '#0f172a',
    ease: 'power1.out',
    borderRadius: '100%',
    scale: 0.6
})

// stagger
gsap.to('.gsap-test2', {
    duration: 0.8,
    scale: 1.3,
    delay: 0.2,
    stagger: 0.2,
    ease: 'power1.out',
    backgroundColor: '#0f172a',
    repeat: -1,
    repeatDelay: 0.4,
    yoyo: true,
    force3D: true
})

// on click animation test
const onClickBoxes = document.querySelectorAll('.gsap-test1');
const elementState = new Map();

onClickBoxes.forEach(box => {
    box.tween = gsap.to(box, {
        rotate: 360,
        borderRadius: '100%',
        ease: 'power1.out',
        duration: 1,
        paused: true,
        backgroundColor: '#0f172a',
    });

    box.addEventListener('click', (e) => {
        if (!elementState.get(e.target)) {
            e.target.tween.play();
            elementState.set(e.target, true);
        } else {
            e.target.tween.reverse();
            elementState.set(e.target, false);
        }
    })
})