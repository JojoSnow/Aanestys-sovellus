
# Käyttötapauskuvaukset

### Selaile äänestyksiä
- *Käyttäjät:* Käyttäjä
- *Laukaisija:* Käyttäjä haluaa selata äänestyksiä
- *Esiehto:* Käyttäjä on etusivulla
- *Käyttötapauksen kulku:* 
    1. Käyttäjä näkee äänestykset etusivulla
    2. Käyttäjä selaa listattuja äänestyksiä etusivulla
- *Jälkiehto:* Käyttäjä voi selata äänestyksiä
- *Poikkeuksellinen toiminta:* 
    1. Äänestyksiä ei ole: Pyydä käymään sivustolla uudestaan
---
### Valitse äänestys
- *Käyttäjät:* Käyttäjä
- *Laukaisija:* Käyttäjä haluaa valita äänestyksen
- *Esiehto:* Käyttäjä klikkaa äänestystä
- *Käyttötapauksen kulku:* 
    1. Käyttäjä valitsee äänestyksen
    2. Järjestelmä näyttää äänestyksen sisällön
- *Jälkiehto:* Käyttäjä näkee äänestyksen sisällön
- *Poikkeuksellinen toiminta:* 
    1. Äänestyksen sisällön näyttäminen ei toimi
---
### Äänestä äänestyksessä
- *Käyttäjät:* Käyttäjä
- *Laukaisija:* Käyttäjä haluaa äänestää äänestyksessä
- *Esiehto:* Käyttäjä on valinnut äänestyksen
- *Käyttötapauksen kulku:*
    1. Järjestelmä pyytää sähkö-postiosoitetta
    2. Käyttäjä antaa sähköposti-osoitteensa
    3. Käyttäjä äänestää
    4. Järjestelmä rekisteröi äänestyksen
    5. Järjestelmä antaa varmistuksen että käyttäjän äänestys on onnistunut
    6. Käyttäjä palaa äänestämäänsä äänestykseen
- *Jälkiehto:* Käyttäjä on äänestänyt äänestyksessä
- *Poikkeuksellinen toiminta:*
    1. Käyttäjä ei anna sähköposti-osoitettaan
    2. Käyttäjän äänestys ei onnistu
---
### Katso äänestystilanne
- *Käyttäjät:* Käyttäjä
- *Laukaisija:* Käyttäjä haluaa nähdä äänestystilanteen
- *Esiehto:* Käyttäjä on valinnut äänestyksen
- *Käyttötapauksen kulku:*
    1. Järjestelmä näyttää äänestystilanteen
- *Jälkiehto:* Käyttäjä näkee äänestystilanteen
- *Poikkeuksellinen toiminta:*
    1. Äänestyksellä ei ole ääniä
---
### Tee äänestyksiä
- *Käyttäjät:* Ylläpitäjä
- *Laukaisija:* Ylläpitäjä haluaa tehdä uuden äänestyksen
- *Esiehto:* Ylläpitäjä on valinnut 'uusi äänestys'-toiminnon
- *Käyttötapauksen kulku:*
    1. Järjestelmä pyytää äänestyksen tietoja
    2. Ylläpitäjä antaa äänestyksen nimen
    3. Ylläpitäjä antaa äänestykselle äänestyksen vaihtoehtoja (väh. 2)
    4. Järjestelmä tekee uuden äänestyksen
- *Jälkiehto:* Ylläpitäjä on saanut äänestyksen tehtyä
- *Poikkeuksellinen toiminta:*
    1. Ylläpitäjä ei anna äänestyksen nimeä
    2. Ylläpitäjä ei anna äänestykselle äänestyksen vaihtoehtoja
    3. Järjestelmä ei tee uutta äänestystä
---
### Poista äänestyksiä
- *Käyttäjät:* Ylläpitäjä
- *Laukaisija:* Ylläpitäjä haluaa poistaa äänestyksen
- *Esiehto:* Ylläpitäjä on valinnut äänestyksen
- *Käyttötapauksen kulku:*
    1. Ylläpitäjä pyytää järjestelmää poistamaan äänestyksen
    2. Järjestelmä poistaa äänestyksen
- *Jälkiehto:* Ylläpitäjä on saanut poistettua äänestyksen
- *Poikkeuksellinen toiminta:*
    1. Järjestelmä ei poista äänestystä