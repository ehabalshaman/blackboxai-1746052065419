# Debt Management System

Volledig systeem voor het beheren van schulden met een dashboard en API.

## Vereisten

- Node.js (versie 16 of hoger)
- MongoDB (lokaal of remote)

## Installatie

1. Clone de repository of download de bestanden.
2. Installeer de dependencies:

```bash
npm install
```

3. Zorg dat MongoDB draait. Voor lokaal gebruik:

```bash
mongod
```

4. Start de server:

```bash
npm start
```

De backend draait nu op `http://localhost:5000`.

## Frontend

Open het bestand `frontend/index.html` in een moderne browser.

## Functionaliteiten

- Schulden toevoegen, bewerken, verwijderen en bekijken
- Filteren en zoeken op schulden
- Classificatie van schulden op status: Melding, Betaald, Te laat
- Real-time statistieken op het dashboard
- Responsive design voor alle apparaten
- Notificaties bij acties

## API Endpoints

- `GET /api/debts` - Alle schulden ophalen (optioneel filteren met query parameters)
- `GET /api/debts/:id` - Schuld ophalen op ID
- `POST /api/debts` - Nieuwe schuld toevoegen
- `PUT /api/debts/:id` - Schuld bijwerken
- `DELETE /api/debts/:id` - Schuld verwijderen

## Configuratie

De MongoDB connectiestring kan worden aangepast in `backend/server.js` via de `MONGO_URI` omgevingsvariabele.

## Opmerkingen

- Zorg dat Node.js en MongoDB correct zijn geïnstalleerd en draaien.
- De frontend communiceert met de backend API via `http://localhost:5000/api/debts`.
- Voor productiegebruik kunnen extra beveiligingsmaatregelen en optimalisaties nodig zijn.
