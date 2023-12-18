# joeapp
For at starte applikationen, bør du opholde dig mappen joeapp. 

### Indsæt af variable Twilio Variable i PM2
Overstående nøgler skal importeres pm2-miløjet...

Gør det to gange
ACCOUNT_SID=ACc51e52fb55e9f546269424e7756bdaf9 pm2 restart server.js --update-env
authToken=abf8956e0b040a230e8621413741aa4d pm2 restart server.js --update-env

### Hvis du ønsker, at køre applikatioen i node i stedet:
export ACCOUNT_SID=ACc51e52fb55e9f546269424e7756bdaf9
export authToken=abf8956e0b040a230e8621413741aa4d


# API-Nøgle til CustomerCare er undladt, da eksponeringen af denne udløser en tilbagetrækkelse af nøglen. 
Skulle du have din egen API-nøgle til ChatGPT, så kan du opstille variablen ligesom overstående, men til variablen: API_KEY='key' pm2 restart server.js --update-env
