(function () {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(subscribeForm);
            const email = formData.get('email');
            if (email) {
                alert(`Thanks for subscribing, ${email}!`);
                subscribeForm.reset();
            }
        });
    }
})();
