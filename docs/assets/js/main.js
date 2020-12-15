const baseurl = 'https://dummyproducts-api.herokuapp.com';
const btnResponse = document.querySelectorAll('.response');
const viewResponse = document.querySelectorAll('.route-response');
const form = document.getElementById('form-apikey');
const formLoader = document.getElementById('container-loader');
const formSuccess = document.getElementById('container-success');
const formFailed = document.getElementById('container-failed');
const displaySuccessMsg = document.getElementById('success-message');
const displayFailedMsg = document.getElementById('failed-message');
const inputEmail = document.getElementById('email');

// onlick of viewing a response
btnResponse.forEach(btn => {
    btn.addEventListener('click', function (event) {
        const { action } = event.target.dataset;

        viewResponse.forEach(responseView => {
            const { view } = responseView.dataset;

            action === view
                ? responseView.style.display = 'block'
                : responseView.style.display = 'none'
        })
    })
})

// form onsubmit to get an apikey
form.addEventListener('submit', async function (event) {
    try {
        event.preventDefault();
        form.style.display = 'none';
        formLoader.style.display = 'flex';

        const raw = await fetch(`${baseurl}/api/key`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: inputEmail.value })
        });

        const res = await raw.json();

        displaySuccessMsg.textContent = res.message;
        formSuccess.style.display = 'flex';
        formLoader.remove();
        formFailed.remove();
        form.remove();
        localStorage.setItem('apikey_requested', 'true')
    }

    catch (error) {
        form.remove();
        formSuccess.remove();
        formLoader.remove();
        formFailed.style.display = 'flex';
    }
})