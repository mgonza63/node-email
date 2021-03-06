const form = document.getElementById("form");
const toast = document.getElementById("toast");
const errorToast = document.getElementById("errorToast");
const spinner = document.getElementById("spinner");
const tryButton = document.getElementById("tryButton")
const API_URL = "https://emailcapsule.herokuapp.com/";

// setting min date for input field
let minDate = new Date();
let dd = minDate.getDate() + 1;
let mm = minDate.getMonth() + 1; // january is 0 
let yyyy = minDate.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("sendDate").setAttribute("min", today);

spinner.style.display = 'none';
toast.style.display = 'none';

errorToast.style.display = 'none';


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
    const sendDate = formData.get('sendDate');

    const user = {
        email,
        message,
        sendDate
    }
    console.log(user);
    form.style.display = 'none';

    spinner.style.display = '';
    toast.style.display = '';


    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }

    }).then(res => {
        res.json();

        if (res.status === 201) {
            setTimeout(() => {
                spinner.style.display = 'none';
                form.style.display = '';
                
            }, 1000);
            setTimeout(() => {
                // 2800ms so it works with animation
                toast.style.display = 'none';
            }, 2800);
        } else {
            setTimeout(() => {
                spinner.style.display = 'none';
                form.style.display = '';
        
            }, 1000);
            setTimeout(() => {
                // 2800ms so it works with animation
                errorToast.style.display = 'none';
            }, 2900);
        }
    })

    form.reset();
});
