
# LungRice ChatBot Webhook

This is a back-end server made to be hooked into DialogFlow agent to give the chatbot functionality and custom responses.

## Requirement
[NodeJS](https://nodejs.org/en/download/) is required.

## Usage
Initialize the project by using the commands below
```bash
    cd <path-to-the-project>
    npm install
```

Then, you can now start the server using the commands below
```bash
    npm start
```

The server will be started on `http://localhost:8081` by default.
If you have a custom hostname for the server, include it in `.env` as below

```
    hostname=<your_hostname>
```

Then you can set the URL below on Fulfillment category in the DialogFlow agent
to connect the agent with this server. Then it should be good to go!

``` 
https://<your_hostname>/api/dialogflow 
```

**Note:** DialogFlow *requires* webhook to be open through HTTPS protocol.
So, you may need additional settings for it to work.

## Authors
- Sahachai Plangrit
- Voraphat Asawathongchai
- Phutanet Prasitsin
- Phuwasu Chumanee
- Nitis Wongkwoen
