document.addEventListener('deviceready', () => {
    loadContacts(); // Charger contacts téléphone au démarrage
});

function loadContacts() {
    const options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;

    const fields = ["displayName", "phoneNumbers"];

    navigator.contacts.find(fields, afficherContacts, gererErreur, options);
}

function afficherContacts(contacts) {
    const contactList = document.getElementById('contactList');
    let contactsHTML = '';

    for (const contact of contacts) {
        const displayName = contact.displayName || 'Sans nom';
        const hasPhone = contact.phoneNumbers && contact.phoneNumbers.length > 0;
        const phoneNumber = hasPhone ? contact.phoneNumbers[0].value : 'Numéro inconnu';
        const phoneType = hasPhone ? contact.phoneNumbers[0].type : '';

        contactsHTML += `
            <li>
                <a href="#detailContactPage">
                    <img src="img/contact.png" alt="Contact" />
                    <h2>${displayName}</h2>
                    <p>${phoneNumber} ${phoneType ? '(' + phoneType + ')' : ''}</p>
                </a>
            </li>
        `;
    }

    // Ajouter contacts dynamiques sans effacer les contacts statiques
    contactList.innerHTML += contactsHTML;
    $(contactList).listview('refresh');
}

function gererErreur(error) {
    console.error("Erreur lors du chargement des contacts :", error);
    alert("Une erreur est survenue lors de la récupération des contacts.");
}
