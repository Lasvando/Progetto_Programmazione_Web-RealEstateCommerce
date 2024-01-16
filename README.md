# Progetto di METODOLOGIE DI PROGRAMMAZIONE PER IL WEB 
### Scopo
L'applicazione è un semplice gestore di proprietà immobiliari dove ogni utente può vedere/pubblicare annunci e ha la possibilità di prenotare
una visita lasciando una caparra calcolata come lo 0,1% del valore dell'immobile.

### Architettura
L'applicazione è divisa in Front-end e Back-end, quindi si configura come un client-server basato su API che seguono il modello REST ove possibile,
implementando chiamate CRUD che agiscono su un DB locale presente nella root di progetto.
Le immagini delle proprietà vengono anch'esse salvate nella root di progetto sotto la cartella ./public rendendole così accessibili.
I pagamenti vengono eseguiti in maniera sandbox usando le API di PayPal
Lo sviluppo su del Front-end non ha seguito un percorso diverso rispetto agli standard architetturali.
Lo sviluppo del Back-end ha seguito una implementazione Route->Controller->Service per cercare di astrarre quanto più possibile le funzionalità e seguire
il principio di Single Responsibility, l'implementazione non è completa in quanto manca una parte di Dependecy Injection per sfruttare anche l'Inversion of Control.
I test del Back-end sono stati eseguiti con Postman in un primo luogo, per poi usare direttamente il front-end

### Funzionalità
- Home
- Login
- Registrazione
- Crezione Proprietà
- Dettagli Proprietà
- Modifica Proprietà
- Eliminazione Proprietà
- Prenotazione visita
- Conferma del pagamento

### Tecnologie Usate
- Front-end --> Angular v16
- Styling --> Bootstrap v5
- Styling Theme --> Bootswatch Flatly
- Back-end --> NodeJS v20.3.1
- Framework Back-end --> Express v4.18.2
- Database --> Sqlite v5.1.6

#### Altre librerie rilevanti usate
- passport v0.7.0
- jsonwebtoken v9.0.2
- sequelize v6.33.0
- nodemon v3.0.1
- morgan v1.10.0
- multer v1.4.5-lts.1

### Database
Il database in Sqlite viene gestito tramite un ORM che in questo caso è Sequelize, così facendo si evitando possibili Typo durante la scrittura delle query a
costo di sacrificare un po' di performance che però in questo caso specifico sono irrilevanti data la piccola entità del progetto.
Le tabelle create sono le seguenti:
- properties
- property_images
- transactions
- users

Le associazioni tra le tabelle vengono gestite dall'ORM nel file ./models/Associations.js e sono le seguenti:
- 1:n (users, properties)
- 1:n (users, transactions)
- 1:n (properties, transactions)
- 1:n (properties, property_images)

### Fasi preliminari prima di avviare l'applicazione
Prima di avviare l'applicazione è necessario creare il file nella root di progetto con le variabili d'ambiente (.env), sono necessarie le seguenti:
- PORT = {{ Inserire una porta libera }}
- DB_NAME = {{ Inserire un nome per il DB }}.db
- TOKEN_SECRET = {{ Inserire una secret key per la generazione e l'autenticazione dei JWT }}
- BASE_URL = http://localhost:

**Nel caso la porta sia diversa da 3000, sarà necessario cambiare anche la variabile d'ambiente nei file di Angular presenti sotto il path ./frontend/src/environments, è sufficiente aggiornare la porta 3000 con quella inserita in precedenza**

### Come usarlo
1. Pull della repository
2. Aprire il terminale all'interno della root di progetto
3. npm install (solo prima volta)
4. node app
5. cd frontend
6. npm install (solo prima volta)
7. ng serve

