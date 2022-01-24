# Test TTS with Dasha API

Web application that crawls specified URL and returns mp3 with text of it

## Docker

### Build

```shell
docker build . -t dasha-in-the-nest
```

### Run 

```shell
docker run --rm -p 8765:3000 --env-file=.env -it dasha-in-the-nest
```

#### Env

Required env variable: `DASHA_API_KEY`.
Other supported env variables:
* `DASHA_SERVER` by default it is `app.us.dasha.ai`
* `DASHA_TEXT_MESSAGE`. If this variable is specified site will be scraped, but the content of this message will be translated to speech.

## Local

### Build

```shell
yarn
yarn build
```

### Run

```shell
yarn start:prod
```

Env variables are the same as for [docker](#env)
