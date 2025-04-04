# GamerLink
Projekt der Vorlesung von Prof. Dr. Von der Trecken. 


Schritte Zum Starten:
    1. Nach dem Ihr das erfolgreich gedownloaded habt geht in euer Terminal und mit CRL + J und gibt ein (sofern das Terminal euch Zeig .... /Gamerlink$ ) 
         => git config --global user.email "<>Eure Email von Github<>"
            git config --global user.name "<>Euer Name<>"

                "Dies Konfiguriert die das in den Commits die ihr macht, abgespeichert wird wer was hochgeladen hat,
                falls es zu Fehlern kommt im Pushen wir bei den jeweiligen die Fehler auf dem Rechner zusammen fixen können

    2. Dann bleibt ihr im Terminal und macht folgendes. Verstehen müsst ihr das nicht
            (Alles Schrittweise)
        > cd Backend
        > sudo apt install npm nodejs
        -> npm --version                     ==> Bei beiden mit der version sollte eine Versions nummer kommen. Wenn nicht ist es nicht installiert und ihr hab was falsches eingegeben
        -> nodejs --version
        > npm install pip pipx
        > pipx install "fastapi[standard]"
        > cd ../webapp
        > npm install
    
    Somit sollte eigentlich alles installiert sein, falls ich nichts vergessen hab

    3. Zum Starten vom Frontend
        > npm run dev

    4. In einem anderen Terminal mit dem Plus rechts bei dem Terminal da wo Bash steht ein weiteres Terminal öffnen
        > cd ../Backend
        > fastapi dev main.py

Fals was schreibt mich an, wenn wir nicht schon alle online sind.
