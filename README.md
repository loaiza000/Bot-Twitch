# Bot 0xUltravioleta

Bot de Twitch para farmeo de UVT (Tokens Ultravioleta)

## Características

- Interacción automatizada con el chat de Twitch
- Capacidades de farmeo de UVT
- Tareas programadas usando node-schedule
- Auto-responde a mensajes específicos
- Horario automático de conexión/desconexión (10 AM - 6 PM hora Bogotá)
- Comando de prueba (!test) para verificar el estado del bot

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en el directorio `src` con las siguientes variables:

```env
TWITCH_USERNAME=nombre_usuario_bot
TWITCH_OAUTH_TOKEN=oauth:tu_token
TWITCH_CHANNEL=canal_objetivo
WALLET_ADDRESS=tu_billetera_ethereum
```

## Uso

Para iniciar el bot:

```bash
npm start
```

El bot:
- Se conectará automáticamente de 10 AM a 6 PM (hora Bogotá)
- Auto-responderá a mensajes específicos con tu dirección de billetera
- Responderá al comando !test cuando sea enviado por 0xultravioleta

## Dependencias

- dotenv: ^16.4.7
- node-schedule: ^2.1.1
- tmi.js: ^1.8.5

## Autor

Daniel Loaiza
