const counterButton = document.getElementById('counterButton');
const counterText = document.getElementById('counterText');
const ee = document.getElementById('ee');

let counter = 0;

if (localStorage.getItem('clicks')) {
    counter = localStorage.getItem('clicks');
}

counterText.innerHTML = counter;

if (localStorage.getItem('buttonRemoved')) {
    counterButton.remove();
    ee.innerHTML = 'Leave this button alone. Don\'t come here again. Do something useful.';
}

counterButton.addEventListener('click', (e) => {
    counter++;
    localStorage.setItem('clicks', counter);
    counterText.innerHTML = counter;
    if (counter === 100) {
        ee.innerHTML = 'Congratulations! You just spent about a minute of your life clicking 100 times on a button on some random website';
    } else if (counter === 200) {
        ee.innerHTML = '200? Do you really have nothing to do?';
    } else if (counter === 300) {
        ee.innerHTML = 'Okay, I\'ll just leave you alone...';
    } else if (counter === 1000) {
        ee.innerHTML = 'Well, congratulations. Now you can take a screenshot and tell your friends that you made 1000 useless clicks of a fucking button on an unnamed website that you see for the first time.';
    } else if (counter === 1100) {
        ee.innerHTML = 'ARE YOU STILL HERE? I guess I\'d better just do you a favor and remove that damn button, and you better rethink your life... Good luck!';
        setTimeout(() => {
            counterButton.remove();
        }, 5000)
        localStorage.setItem('buttonRemoved', true);
    }
})