document.querySelectorAll("input").forEach((item) => {});

async function kookie() {
  const username = document.getElementById("username-sign-up").value;
  const password = document.getElementById("password-sign-up").value;
  const email = document.getElementById("email-sign-up").value;

  if (username !== "" && password !== "" && email !== "") {
    // Set cookies with an expiration date in the future
    var expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Set expiration for 1 year from now

    document.cookie =
      "username=" +
      username +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
    document.cookie =
      "password=" +
      password +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
    document.cookie =
      "email=" +
      email +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";

    alert("Cookies are set");
    window.location.href = "user.html";

    // Assuming signup was successful, call mailToUser
    const htmlMsg = `Hej ${username},<br> Mange tak fordi du har oprettet dig som bruger hos Joe & The Juice!<br> Du kan nu nyde vores store sortiment, herunder juice og sandwiches. <br> Du kan ovenikøbet tilføje venner og invitere dem til et besøg på Joe & The Juice! <br><br> De bedste hilsner<br>Joe Teamet.`;

    const recieverMail = email; // Assuming 'email' is the user's email
    const name = username; // Assuming 'username' is the user's name

    // Make an HTTP request to send the email
    try {
      const response = await fetch("/site/service/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ htmlMsg, recieverMail, name }),
      });

      if (response.ok) {
        alert("Email sent successfully");
        window.location.href = "user.html";
      } else {
        //alert("Failed to send email");
        console.error("Error sending email in signup.js:", error);
        console.log("Error sending email in signup.js:", error);
      }
    } catch (error) {
      console.error(error);
      //alert("Failed to send email. Check the console for details bro.", error);
    }
  } else {
    //alert("Please fill out the form");
    console.log("Please fill out the form");
  }
}
