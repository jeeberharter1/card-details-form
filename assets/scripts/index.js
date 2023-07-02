const confirmBtn = document.getElementById('confirm-btn'),
      card = document.getElementById('card'),
      confirmation = document.getElementById('confirmation'),
      confirmationBtn = document.getElementById('confirmation-btn');

const numberInputFormat = /[0-9]{16}/,
      numberOutputFormat = /.{1,4}/g;

function checkInput() {
    const inputs = document.querySelectorAll('input'),
          monthInput = document.getElementById('month'),
          yearInput = document.getElementById('year'),
          cardNumber = document.getElementById('card-number'),
          cardName = document.getElementById('card-name'),
          cardMonth = document.getElementById('card-month'),
          cardYear = document.getElementById('card-year'),
          cardCVC = document.getElementById('card-cvc');

    inputs.forEach(input => {
        let error;

        if (input.parentElement.className === 'input__exp-date') {
            error = input.parentElement.nextElementSibling;
        } else {
            error = input.nextElementSibling;
        }

        if (input.value.trim().length === 0) {
            error.innerHTML = "Can't be blank";
            error.style.display = "block";
            input.classList.add('invalid');
        } else if (input.id === 'number' && !input.value.trim().match(numberInputFormat)) {
            error.innerHTML = "Wrong format, numbers only";
            error.style.display = "block";
            input.classList.add('invalid');
        } else if ((input === monthInput || input === yearInput) &&
                   ((monthInput.value.trim().length === 0 || monthInput.value > 12 || monthInput.value <= 0) || 
                   (yearInput.value.trim().length === 0 || yearInput.value < 23))) {
                    
            error.innerHTML = "Invalid expiration";
            error.style.display = "block";

            if ((input.id === 'month' && (input.value.trim().length === 0 || input.value > 12 || monthInput.value <= 0)) || 
                (input.id === 'year' && (input.value.trim().length === 0 || yearInput.value < 23))) {
                input.classList.add('invalid');
            } else {
                input.classList.remove('invalid');
            }
        } else if (input.id === 'cvc' && input.value.trim().length < 3) {
            error.innerHTML = "Invalid format";
            error.style.display = "block";
            input.classList.add('invalid');
        } else {
            error.style.display = "none";
            input.classList.remove('invalid');
        }
    });

    let validity = Array.from(inputs).every((input, index) => {
        if (input.classList.contains('invalid')) {
            return  false;
        } else {
            switch (index) {
                case 0:
                    cardName.innerHTML = input.value;
                    break;

                case 1:
                    cardNumber.innerHTML = input.value.trim().match(numberOutputFormat).join(' ');
                    break;

                case 2:
                    cardMonth.innerHTML = input.value;
                    break;

                case 3:
                    cardYear.innerHTML = input.value;
                    break;

                case 4:
                    cardCVC.innerHTML = input.value;
                    break;
            }

            return true;
        }
    })

    if (validity) {
        card.style.display = 'none';
        confirmation.style.display = 'flex';
    }
}

confirmBtn.addEventListener('click', checkInput);
confirmationBtn.addEventListener('click', () => {
    card.style.display = 'flex';
    confirmation.style.display = 'none';
    document.getElementById('form').reset();
})

window.onload = () => {
    document.getElementById('form').reset();
}