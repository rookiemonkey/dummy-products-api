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


/*!
 * Fork Corner - https://fork-corner.warengonzaga.com
 * A modern and global open source fork corner label for your project's landing page.
 * Version: 2.0.1
 * Github: https://github.com/WarenGonzaga/fork-corner
 * Licensed under The MIT License: http://opensource.org/licenses/MIT
 * Copyright (c) 2021 Waren Gonzaga
 *
 * Facebook: @warengonzagaofficial
 * Twitter: @warengonzaga
 * Github: @warengonzaga
 * Website: warengonzaga.com
 */

const fchead = document.getElementsByTagName("head")[0], fcController = document.getElementById("fork-corner"), fcIcon = document.createElement("i"), fcDevicon = document.createElement("link"); fcDevicon.rel = "stylesheet", fcDevicon.type = "text/css", fcDevicon.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css"; const fcElement = document.createElement("div"); document.querySelector(".fc-theme-git") && fcIcon.setAttribute("class", "devicon-git-plain"), document.querySelector(".fc-theme-github") && fcIcon.setAttribute("class", "devicon-github-plain"), document.querySelector(".fc-theme-gitlab") && fcIcon.setAttribute("class", "devicon-gitlab-plain"), document.querySelector(".fc-theme-bitbucket") && fcIcon.setAttribute("class", "devicon-bitbucket-plain"), fchead.appendChild(fcDevicon), fcController.appendChild(fcIcon), fcController.parentNode.insertBefore(fcElement, fcController.nextSibling);