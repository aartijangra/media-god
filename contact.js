const snackContainer = document.getElementById('snackbar-container');
const loader = document.getElementById('form-loader-container');

let validEmail = false;
let validPhone = false;

//phone number validation
document.getElementById('form-phone').addEventListener('blur', e => {
    var phoneno = /^\d{10}$/;
    if(e.target.value.match(phoneno))
    {
        validPhone = true;
    }
    else
    {
        showSnackbar(
            "Please enter a valid Phone number.",
            "warning"
        );
        validPhone = false;
    }
});

document.getElementById('form-email').addEventListener('blur', e => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
        validEmail= true;
    }
    else
    {

        validEmail = false;
        showSnackbar(
            "Please enter a valid email.",
            "warning"
        );

    }
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name');
    const email = document.getElementById('form-email');
    const phone = document.getElementById('form-phone');
    const message = document.getElementById('form-message');

    if(name.value && email.value && phone.value && message.value){

        if(validEmail && validPhone) {
            
            loader.className = "show";

            const params = {
                from_name: name.value,
                email: email.value,
                phone: phone.value,
                message: message.value
            }

            emailjs.send('service_xmfe9wl', 'template_qudsbwq', params).then(res => {
                name.value = '';
                message.value = '';
                email.value = '';
                phone.value = '';
                loader.className = "hide";
                showSnackbar(
                    "Successfully submitted.",
                    "success"
                );
            }).catch(err => {
                console.log(err);
                loader.className = "hide";
                showSnackbar(
                    "Something went wrong, please try again later.",
                    "error"
                );
            });

        }
        else {
            showSnackbar(
                "Please enter vaid email and/or phone number",
                "error"
            );
        }

    }else {
        showSnackbar(
            "Please fill all the fields.",
            "error"
        );
    }

});

function showSnackbar(message, severity) {

    const snackbar = document.createElement("div");
    snackbar.className = `snackbar snack-${severity}`; 
    snackbar.innerText = message;
    snackContainer.appendChild(snackbar);
    
    setTimeout(() => {snackbar.remove()},3000);
};
