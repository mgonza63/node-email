const form = document.getElementById("form");
const toast = document.getElementById("toast");
const spinner = document.getElementById("spinner")

const API_URL = 'https://emailcapsule.herokuapp.com//users';
spinner.style.display = 'none';
//   setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const message = formData.get('message');
    const numberOfDays = formData.get('numberOfDays');

    const user = {
        email,
        message,
        numberOfDays
    }
    console.log(user);
    form.style.display = 'none';

    spinner.style.display = '';
    setTimeout(() => {
        spinner.style.display = 'none';
        form.style.display = '';

    }, 1000);
        toast.className = 'show';

    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 4000);
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
});
