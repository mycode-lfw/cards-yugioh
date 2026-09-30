const API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

// La classe rappresenta una carta Mostro.
class CartaMostro {
    constructor(dati) {
        this.id = dati.id;
        this.nome = dati.name;
        this.tipo = dati.type;
        this.descrizione = dati.desc;
        this.attacco = dati.atk;
        this.difesa = dati.def;
        this.livello = dati.level;
        this.attributo = dati.attribute;
        this.razza = dati.race;
        this.immagine = dati.card_images[0].image_url_small;
    }
}

// Elementi della pagina.
const formRicerca = document.getElementById("search-form");
const campoRicerca = document.getElementById("search-input");
const messaggioStato = document.getElementById("status");
const contenitoreRisultati = document.getElementById("results");
const numeroRisultati = document.getElementById("result-count");
const sezioneConfronto = document.getElementById("comparison");
const contenutoConfronto = document.getElementById("comparison-content");
const pulsanteAzzera = document.getElementById("reset-comparison");

// Array utilizzati dall'applicazione.
let carteTrovate = [];
let carteSelezionate = [];

// Quando viene inviato il form parte la ricerca.
formRicerca.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const testoRicerca = campoRicerca.value.trim();

    if (testoRicerca === "") {
        mostraMessaggio("Inserisci il nome di una carta.", true);
        return;
    }

    cercaCarte(testoRicerca);
});

// Effettua la richiesta HTTP e crea gli oggetti CartaMostro.
async function cercaCarte(nome) {
    mostraMessaggio("Caricamento delle carte...");
    contenitoreRisultati.innerHTML = "";
    numeroRisultati.textContent = "";

    carteTrovate = [];
    azzeraConfronto();

    try {
        const indirizzo = API_URL + "?fname=" + encodeURIComponent(nome) + "&language=it";
        const risposta = await fetch(indirizzo);

        if (!risposta.ok) {
            throw new Error("Nessuna carta trovata.");
        }

        const risultato = await risposta.json();
        carteTrovate = [];

        // Vengono conservate solamente le carte che possiedono ATK e DEF.
        for (const datiCarta of risultato.data) {
            if (datiCarta.atk !== undefined && datiCarta.def !== undefined) {
                const nuovaCarta = new CartaMostro(datiCarta);
                carteTrovate.push(nuovaCarta);
            }

            // Mostriamo al massimo 24 carte.
            if (carteTrovate.length === 24) {
                break;
            }
        }

        if (carteTrovate.length === 0) {
            throw new Error("La ricerca non ha trovato carte Mostro.");
        }

        mostraCarte();
        numeroRisultati.textContent = carteTrovate.length + " carte";
        mostraMessaggio("Ricerca completata.");
    } catch (errore) {
        carteTrovate = [];
        mostraMessaggio(errore.message + " Prova con un altro nome.", true);
    }
}

// Mostra nella pagina tutte le carte trovate.
function mostraCarte() {
    contenitoreRisultati.innerHTML = "";

    carteTrovate.forEach(function (carta) {
        const elementoCarta = document.createElement("article");
        elementoCarta.className = "card";

        if (cartaSelezionata(carta)) {
            elementoCarta.classList.add("selected");
        }

        elementoCarta.innerHTML = `
            <img src="${carta.immagine}" alt="Carta ${carta.nome}" loading="lazy">
            <div class="card-body">
                <p class="meta">${carta.attributo} · LV ${carta.livello} · ${carta.razza}</p>
                <h3>${carta.nome}</h3>
                <div class="stats">
                    <span>ATK ${carta.attacco}</span>
                    <span>DEF ${carta.difesa}</span>
                </div>
                <p class="description">${carta.descrizione}</p>
                <button type="button">
                    ${cartaSelezionata(carta) ? "Rimuovi" : "Seleziona"}
                </button>
            </div>
        `;

        const bottone = elementoCarta.querySelector("button");

        bottone.addEventListener("click", function () {
            selezionaCarta(carta);
        });

        contenitoreRisultati.appendChild(elementoCarta);
    });
}

// Controlla se una carta è già presente nella selezione.
function cartaSelezionata(carta) {
    for (const cartaScelta of carteSelezionate) {
        if (cartaScelta.id === carta.id) {
            return true;
        }
    }

    return false;
}

// Aggiunge o rimuove una carta dal confronto.
function selezionaCarta(carta) {
    if (cartaSelezionata(carta)) {
        rimuoviCarta(carta);
    } else {
        if (carteSelezionate.length === 2) {
            mostraMessaggio("Puoi confrontare solamente due mostri.", true);
            return;
        }

        carteSelezionate.push(carta);
        mostraMessaggio("Carta aggiunta al confronto.");
    }

    mostraCarte();
    aggiornaConfronto();
}

// Rimuove dalla selezione la carta ricevuta.
function rimuoviCarta(carta) {
    for (let i = 0; i < carteSelezionate.length; i++) {
        if (carteSelezionate[i].id === carta.id) {
            carteSelezionate.splice(i, 1);
            break;
        }
    }
}

// Aggiorna l'area dedicata al confronto
function aggiornaConfronto() {
    if (carteSelezionate.length === 0) {
        sezioneConfronto.hidden = true;
        return;
    }

    sezioneConfronto.hidden = false;

    if (carteSelezionate.length === 1) {
        contenutoConfronto.innerHTML = "<p>Seleziona un altro mostro per avviare il confronto.</p>";
        return;
    }

    const primaCarta = carteSelezionate[0];
    const secondaCarta = carteSelezionate[1];

    const vincitoreAttacco = confrontaValore(primaCarta, secondaCarta, "attacco");
    const vincitoreDifesa = confrontaValore(primaCarta, secondaCarta, "difesa");

    contenutoConfronto.innerHTML = `
        <div class="fighter">
            <img src="${primaCarta.immagine}" alt="${primaCarta.nome}">
            <h3>${primaCarta.nome}</h3>
        </div>
        <div class="versus">VS</div>
        <div class="fighter">
            <img src="${secondaCarta.immagine}" alt="${secondaCarta.nome}">
            <h3>${secondaCarta.nome}</h3>
        </div>
        <div class="verdict">
            <strong>Attacco:</strong> ${vincitoreAttacco}<br>
            <strong>Difesa:</strong> ${vincitoreDifesa}
        </div>
    `;
}

// Confronta l'attacco oppure la difesa delle due carte
function confrontaValore(primaCarta, secondaCarta, proprieta) {
    const primoValore = primaCarta[proprieta];
    const secondoValore = secondaCarta[proprieta];

    if (primoValore > secondoValore) {
        return "Vince " + primaCarta.nome + " con " + primoValore + " punti.";
    }

    if (secondoValore > primoValore) {
        return "Vince " + secondaCarta.nome + " con " + secondoValore + " punti.";
    }

    return "Parità: entrambe hanno " + primoValore + " punti.";
}

// Svuota il confronto
function azzeraConfronto() {
    carteSelezionate = [];
    sezioneConfronto.hidden = true;

    if (carteTrovate.length > 0) {
        mostraCarte();
    }
}

function mostraMessaggio(testo, errore = false) {
    messaggioStato.textContent = testo;
    messaggioStato.classList.toggle("error", errore);
}

pulsanteAzzera.addEventListener("click", azzeraConfronto);
