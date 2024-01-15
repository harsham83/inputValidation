function submitForm(e) {
    const form = document.getElementById('registrationForm');
    const checkbox = document.getElementById('terms');
    const submitButton = document.querySelector('button[type="button"]');
    const dobInput = document.getElementById('dob');
    const dobErrorMessage = document.querySelector('#dob + .error-message');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordErrorMessage = document.querySelector('#confirmPassword + .error-message');
    const countrySelect = document.getElementById('country');
    const countryErrorMessage = document.querySelector('#country + .error-message');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const genderErrorMessage = document.querySelector('#genderError');
    console.log(genderErrorMessage);
    
    if (isValidDOB(dobInput.value) && passwordInput.value === confirmPasswordInput.value){
        // Form is valid and checkbox is checked, show success message
        document.getElementById('successMessage').style.display = 'block';
        submitButton.disabled = true; // Disable the button after successful submission
    } else {
        // Form is invalid or checkbox is not checked, show error messages
        const elements = form.elements;
        console.log(form.elements);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (!element.checkValidity()) {
                const errorMessage = element.nextElementSibling;
                errorMessage.style.display = 'block';
            }
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordErrorMessage.style.display = 'block';
        } else {
            confirmPasswordErrorMessage.style.display = 'none';
        }

        if (!countrySelect.value) {
            countryErrorMessage.style.display = 'block';
        } else {
            countryErrorMessage.style.display = 'none';
        }

        // Display gender error message if it's not selected
        if (!isGenderSelected(genderInputs)) {
            genderErrorMessage.style.display = 'block';
        } else {
            genderErrorMessage.style.display = 'none';
        }

        submitButton.disabled = !checkbox.checked || !isValidDOB(dobInput.value);
        // Display date of birth error message if it's invalid
        if (!isValidDOB(dobInput.value)) {
            dobErrorMessage.style.display = 'block';
        } else {
            dobErrorMessage.style.display = 'none';
        }
        if (!checkbox.checked) {
            submitButton.disabled = true;
        }
        checkbox.checked = false;
    }
}

const termsAndConditions = ()=>{
    console.log(true);
    const checkbox = document.getElementById('terms');
    const submitButton = document.querySelector('button[type="button"]');
    if (!checkbox.checked) {
        submitButton.disabled = true;
    }else{
        submitButton.disabled = false;
    }
}

function isValidDOB(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return dobDate <= minAgeDate;
}

function isGenderSelected(genderInputs) {
    // Check if at least one gender option is selected
    return Array.from(genderInputs).some(input => input.checked);
}