# Imágenes Del Mundo 🌍

Mayor información sobre la aplicación en [Imágenes Del Mundo](https://whimsical.com/imagenes-del-mundo-S2jsnCNk5cM81LfZq3M1HC)📚


## ¡Una Carrera Para Encontrar Las Imágenes Más Interesantes De La Web 🏁

**Descripción:** Los vendedores de la empresa "Imágenes del mundo" deben buscar en la web imágenes relacionadas a una palabra clave proporcionada por el usuario. La imagen que más le guste al usuario ganará 3 puntos. El vendedor que complete 20 puntos ganará la carrera, obteniendo la oportunidad de crear una factura en Alegra con los puntos acumulados por todos los vendedores durante la carrera.

## ¿Cómo Funciona? 🚀

1. **Ingreso de Palabra Clave:** El usuario ingresa una palabra clave en la aplicación para iniciar su búsqueda de imágenes.
2. **Selección de Imágenes:** Cada vendedor muestra una imagen basada en la palabra clave ingresada por el usuario.
3. **Elección de Imagen Favorita:** El usuario selecciona la imagen que más le gusta, otorgando 3 puntos al vendedor correspondiente.
4. **Finalización de la Carrera:** La carrera termina cuando un vendedor alcanza 20 puntos.
5. **Creación de Factura en Alegra:** El vendedor ganador crea una factura en Alegra, reflejando los puntos acumulados por todos los participantes.


## Tecnologías Utilizadas 🛠️

- Frontend: VueJS, TypeScript, Pinia, vite
- Backend: Firebase Database
- Estilos: Tailwind CSS

## Configuración de Variables de Entorno 📝

Para configurar correctamente tu entorno de desarrollo, debes crear un archivo `.env` en el directorio raíz de tu proyecto. Este archivo contendrá las variables de entorno necesarias para conectar tu aplicación con los servicios externos utilizados.

### Obtención de Datos de Configuración

- **Alegra**: [documentación oficial de Alegra](https://developer.alegra.com/docs/informaci%C3%B3n-general-2).
- **Google Custom Search Engine**: [documentación de Google Custom Search](https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=es-419).
- **Firebase**: [documentación de Firebase](https://firebase.google.com/docs/firestore?hl=es-419).

### Ejemplo de Archivo `.env`

```plaintext
# Reemplaza los valores de ejemplo con tus propias credenciales
APP_ALEGRA_USER="tu_usuario_alegra@example.com"
APP_ALEGRA_TOKEN="tu_token_alegra"
APP_ALEGRA_URL_SELLERS="URL_DE_LA_API_DE_VENDEDORES"
APP_ALEGRA_URL_INVOICES="URL_DE_LA_API_DE_FACTURAS"

APP_GOOGLE_API_KEY="TU_CLAVE_API_DE_GOOGLE"
APP_GOOGLE_SEARCH_ENGINE_ID="ID_DE_TU_MOTOR_DE_BUSQUEDA_PERSONALIZADO"
APP_GOOGLE_BASE_URL="BASE_URL_DEL_SERVICIO_DE_BUSQUEDA"

APP_FIREBASE_API_KEY="TU_CLAVE_API_DE_FIREBASE"
APP_FIREBASE_AUTH_DOMAIN="DOMINIO_AUTENTICACION_DE_FIREBASE"
APP_FIREBASE_DATABASE_URL="URL_DE_TU_BASE_DE_DATOS_FIRESTORE"
APP_FIREBASE_PROJECT_ID="ID_DE_TU_PROYECTO_FIREBASE"
APP_FIREBASE_STORAGE_BUCKET="NOMBRE_DE_TU_ALMACEN_EN_FIREBASE"
APP_FIREBASE_MESSAGING_SENDER_ID="ID_DEL_ENVIADOR_DE_MENSAJES_FIREBASE"
APP_FIREBASE_APP_ID="ID_DE_TU_APPLICACION_FIREBASE"
```

## Personalización de Configuración 🔧

Consultar la [Referencia de Configuración de Vite](https://vitejs.dev/config/).

## Configuración del Proyecto 🖥️

```bash
npm install
```

### Compilación y Recarga en Vivo para Desarrollo 🔄

```bash
npm run dev
```

### Verificación de Tipos, Compilación y Minificación para Producción 🎯

```bash
npm run build
```
