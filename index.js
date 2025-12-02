//template_iavynmu
//service_5bpn8ak
//wi6ra8rOTt_-ijw2w

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

let isModalOpen = false;
function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove('modal--open');
    }
    isModalOpen = true;
    document.body.classList += ' modal--open';
}