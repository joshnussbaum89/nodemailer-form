// 1. create an event listener for when the user submits the form
// 2. When the event is triggered, create a FormData object called 'mail' based on the input values and their name attributes in the form.
// 3. Call a function called sendMail() with 'mail' passed as a parameter. This function will use Fetch API to post the mail to the url 'send' (specified in our form element attribute).

const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

// 1. Supply the base url with /send for the fetch(). For my example, the base url is where I deploy the app: nodemailer-vic-lo.herokuapp.com.
// 2. Specify the method as 'post' since we are sending data, not getting.
// 3. Specify the body as 'mail' because we are sending this data in our request

async function sendMail(mail) {
  // THIS NEEDS TO BE A HOSTED URL!
  await fetch("https://contact-form-josh.herokuapp.com/send", {
    method: "POST",
    body: mail,
  }).then((response) => {
    return response.json();
  });
}
