{
    "use strict"

    const nachname = document.getElementById('nName');
    const vorname = document.getElementById('vName');
    const plZahl = document.getElementById('plz');
    const bform = document.getElementById('bossform');


    function inputCheck(inputWord, fall) {
        inputWord.addEventListener('input', (evt) => {
            let word = inputWord.value;
            switch (fall) {
                case 'letter':
                    // schön gelöst
                    word.match(/[^a-z]/gi) && (inputWord.value = word.replace(/[^a-z]/gi, ''));
                    break;
                case 'number':
                    word.match(/[^0-9]/gi) && (inputWord.value = word.replace(/[^0-9]/gi, ''));
                    break;
            }
        });

    }


    function prepare() {
        inputCheck(vorname, 'letter');
        inputCheck(nachname, 'letter');
        inputCheck(plZahl, 'number');
    }
    prepare();

    // Fieldset 1. - Altersgruppe

    function reisegruppe() {
        document.getElementsByName('Person').forEach(radio => {
            if (radio.checked) {
                console.log('sie sind als: ', radio.value, ' registriert');
            }
        });
    }




    // Fieldset 2. - Kontaktformular
    function kontaktForm() {
        let nName = document.getElementById('nName').value;
        nName && (nName = 'Nachname: ' + nName);
        let vName = document.getElementById('vName').value;
        vName && (vName = ', Vorname: ' + vName);
        let strasse = document.getElementById('strasse').value;
        strasse && (strasse = ', Straße: ' + strasse);
        let pZahl = document.getElementById('plz').value;
        pZahl && (pZahl = ', Plz:  ' + pZahl);
        let mail = document.getElementById('meineMail').value;
        mail && (mail = ', Mail: ' + mail);



        console.log('Die Bestellbestätigung wird gesendet an: ',
            nName + vName + strasse + pZahl + mail);
    }

    // Fieldset 3. - Feedback/ Kommenta

    function anmerkunge() {
        const anmerkungElement = document.getElementById('anmerkungen');
        if(anmerkungElement.value) {
            console.log('Kommentar/Feedback: ', anmerkungElement.value);
        }
    }




    function processForm(e) {
        e.preventDefault();

        passwort();
        return false;
    }

    var form = document.getElementById('bossform');
    const p = document.getElementById('passwort');
    const cancel = document.getElementById('cancel');


    // Fieldset 9. - PASSWORT
    function passwort() {
        const passW = p.value;
        const leer = !passW.length;
        let fehler = '';
        if (passW.length < 4) {
            fehler += ' Passwortlänge nicht erreicht; ';
        }
        if (!passW.match(/[A-Z]/g)) {

            fehler += ' Großbuchstaben fehlt; ';
        }
        if (!passW.match(/[0-9]/gi)) {
            fehler += ' Zahl fehlt; ';
        }
        if (!passW.match(/[^A-Za-z0-9]/gi)) {
            fehler += ' Sonderzeichen fehlt; ';
        }
        if (leer) fehlermeldung('Passwortfeld ist leer')
        else if (fehler.length) fehlermeldung(fehler)
        else {
            richtigBild();
            reisegruppe();
            kontaktForm();
            anmerkunge();
            console.log('Das super geheime Passwort lautet: ' +passW);
        }

        return !(leer || fehler.length);
    }

    //ABSENDEN
    form.addEventListener("submit", processForm);
    cancel.addEventListener("click", () => fehlermeldung('abbruch'));
    //ABBRECHEN



    //Zusatz. Bildfunktion von Aufgabe 8 integriert

    const classTextFehler = 'classTextFehler';
    const classTextBild = 'classTextBild';

    function fehlermeldung(fehler) {
        showMessage(p, fehler, classTextFehler);

    }

    const showMessage = (element, text, classText) => {
        removeElementByClass([classText, classTextBild]);
        if (!(text instanceof Array)) text = [text];

        text.forEach(t => {
            let div = document.createElement("div");
            div.setAttribute("class", classText);
            let message = document.createTextNode(t);
            div.appendChild(message);
            element.parentNode.appendChild(div);
        })


    }

    const removeElementByClass = classText => {
        //
        if (!(classText instanceof Array)) classText = [classText];
        classText.forEach(c => [...document.getElementsByClassName(c)].forEach(e => e.remove()));
    }

    //Bild im DOM hinzufügen
    function richtigBild() {
        let image = new Image();
        image.src = randomImage();
        image.setAttribute('class', classTextBild);

        removeElementByClass([classTextBild, classTextFehler]);

        (bform.appendChild(image));

    }

    // zufälliges Bild aussuchen, dass in einer Array gespeichert wird
    function randomImage() {
        let imageArray = new Array();

        imageArray[0] = "style/pic_js/sheep.jpg";
        imageArray[1] = "style/pic_js/shark.png";
        imageArray[2] = "style/pic_js/wolf.png";
        imageArray[3] = "style/pic_js/ballot-box.png";
        imageArray[4] = "style/pic_js/lion.png";

        let index = Math.floor(Math.random() * imageArray.length);

        return imageArray[index];
    }


}