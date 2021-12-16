const form = document.getElementById("form");

function toast(event) {
  // Get the snackbar DIV
  const toast = document.getElementById("toast");

  // Add the "show" class to DIV
  toast.className = "show";

  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

form.addEventListener('submit', (event) => {
    // event.preventDefault();
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
});
