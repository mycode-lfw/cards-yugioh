# Yu-Gi-Oh! Card Explorer

Applicazione web sviluppata in **HTML, CSS e JavaScript vanilla** che permette di cercare carte Mostro di Yu-Gi-Oh! e confrontarne le caratteristiche principali.

Il progetto utilizza la **YGOPRODeck API** per recuperare dinamicamente le informazioni sulle carte.

## Funzionalità

L'applicazione permette di:

- cercare carte Yu-Gi-Oh! inserendo parte del loro nome;
- recuperare i dati tramite una richiesta HTTP alla YGOPRODeck API;
- visualizzare fino a 24 carte Mostro;
- mostrare per ogni carta:
  - nome;
  - immagine;
  - attributo;
  - livello;
  - razza;
  - punti ATK;
  - punti DEF;
  - descrizione;
- selezionare fino a due carte;
- confrontare ATK e DEF delle due carte selezionate;
- evidenziare graficamente le carte selezionate;
- rimuovere una carta dalla selezione;
- azzerare il confronto;
- gestire ricerche senza risultati ed eventuali errori della richiesta HTTP.

## Tecnologie utilizzate

- HTML5
- CSS3
- JavaScript
- Fetch API
- YGOPRODeck API

Non sono utilizzati framework o librerie JavaScript esterne.

## API utilizzata

Il progetto utilizza la YGOPRODeck API:

```text
https://db.ygoprodeck.com/api/v7/cardinfo.php
```

La ricerca viene effettuata utilizzando il parametro `fname`, che permette di cercare le carte contenenti nel nome il testo inserito dall'utente.

Esempio:

```text
https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=dragon&language=it
```

## Struttura del progetto

```text
.
├── index.html
├── style.css
├── script.js
├── .gitignore
└── README.md
```

### `index.html`

Contiene la struttura della pagina:

- form di ricerca;
- area dei messaggi di stato;
- sezione dedicata al confronto;
- contenitore dei risultati.

### `style.css`

Gestisce l'aspetto grafico dell'applicazione, tra cui:

- layout responsive;
- griglia delle carte;
- stile delle card;
- evidenziazione delle carte selezionate;
- area di confronto;
- adattamento per smartphone e dispositivi con schermi ridotti.

### `script.js`

Contiene la logica dell'applicazione:

- classe `CartaMostro`;
- gestione del form di ricerca;
- richiesta asincrona con `fetch()`;
- conversione della risposta JSON;
- creazione degli oggetti carta;
- rendering dinamico delle card;
- gestione della selezione;
- confronto tra ATK e DEF;
- gestione degli errori.

## Concetti JavaScript utilizzati

Il progetto rappresenta anche un esercizio pratico su diversi argomenti fondamentali di JavaScript:

- classi e oggetti;
- costruttori;
- array;
- cicli `for...of`;
- `forEach()`;
- funzioni;
- eventi;
- manipolazione del DOM;
- template literal;
- programmazione asincrona;
- `async` / `await`;
- Fetch API;
- gestione degli errori con `try...catch`;
- `throw new Error()`;
- utilizzo di `encodeURIComponent()`.

## Avvio del progetto

Non sono necessarie installazioni o dipendenze.

È sufficiente clonare il repository:

```bash
git clone URL-DEL-REPOSITORY
```

Entrare nella cartella:

```bash
cd NOME-REPOSITORY
```

e aprire il file:

```text
index.html
```

nel browser.

In alternativa è possibile utilizzare un server locale, ad esempio l'estensione **Live Server** di Visual Studio Code.

## Utilizzo

1. Inserire nel campo di ricerca il nome, o parte del nome, di una carta.
2. Premere **Cerca**.
3. L'applicazione recupera dalla API le carte corrispondenti.
4. Premere **Seleziona** su una carta per aggiungerla al confronto.
5. Selezionare una seconda carta.
6. L'applicazione confronta automaticamente i valori di **ATK** e **DEF**.
7. Utilizzare **Azzera confronto** per eliminare la selezione corrente.

## Responsive design

L'interfaccia è progettata per adattarsi anche a tablet e smartphone.

Su schermi più piccoli la griglia modifica automaticamente il numero di colonne e alcuni contenuti vengono semplificati per mantenere leggibile l'interfaccia.

## Scopo del progetto

Il progetto è stato realizzato a scopo didattico per esercitarsi nell'integrazione tra:

**HTML + CSS + JavaScript + API REST**

con particolare attenzione alla programmazione asincrona e all'utilizzo di un approccio orientato agli oggetti in JavaScript.

## Crediti

I dati e le immagini delle carte sono forniti tramite la **YGOPRODeck API**.