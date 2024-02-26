function sendMail() {
    let parms = {
        from_name : document.getElementById('from_name').value,
        from_email : document.getElementById('from_email').value,
        from_message : document.getElementById('from_message').value,
    }

    emailjs.send('service_jbjuudp', 'template_d0tfvrb', parms).then(alert('Email has been send successfully!'));
}