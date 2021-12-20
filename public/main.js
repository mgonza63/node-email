const form = document.getElementById("form");
const toast = document.getElementById("toast");
const spinner = document.getElementById("spinner")
const tryButton = document.getElementById("tryButton")
const API_URL = "https://emailcapsule.herokuapp.com/";

spinner.style.display = 'none';
toast.style.display = 'none';

// debug submit 
// tryButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     form.style.display = 'none';

//     spinner.style.display = '';
//     toast.style.display = '';

//     setTimeout(() => {
//         spinner.style.display = 'none';
//         form.style.display = '';

//     }, 1000);
//     setTimeout(() => {
//         // 2800ms so it works with animation
//         toast.style.display = 'none';
//     }, 2800);
//     form.reset();

// })

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
    toast.style.display = '';

    setTimeout(() => {
        spinner.style.display = 'none';
        form.style.display = '';

    }, 1000);
    setTimeout(() => {
        // 2800ms so it works with animation
        toast.style.display = 'none';
    }, 2800);


    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }.then
    })
    form.reset();
});
