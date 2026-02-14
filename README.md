# 🔮 The Art of the Nen

<div align="center">

**Explora el complejo sistema de energía vital del universo de Hunter x Hunter**

Una aplicación web interactiva que te permite descubrir tu tipo de Nen, aprender sobre las técnicas avanzadas y crear tu propia habilidad especial (Hatsu) con inteligencia artificial.

[🎯 Demo en Vivo](#) | [📖 Documentación](#características) | [🐛 Reportar Bug](https://github.com/KevinKeyssx/The-art-of-the-nen/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Uso](#-uso)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia y Créditos](#-licencia-y-créditos)

---

## 🎯 Acerca del Proyecto

**The Art of the Nen** es una aplicación web educativa e interactiva diseñada para fans de Hunter x Hunter y personas interesadas en explorar el fascinante sistema Nen. La aplicación combina contenido educativo detallado con experiencias interactivas potenciadas por inteligencia artificial.

### ¿Para quién es esta aplicación?

- **Fans de Hunter x Hunter**: Profundiza tu conocimiento sobre el sistema Nen y descubre qué tipo de usuario serías.
- **Nuevos exploradores**: Aprende sobre el sistema Nen de manera interactiva y entretenida.
- **Creativos**: Genera tu propia habilidad especial (Hatsu) personalizada usando IA.

---

## ✨ Características

### 🎓 Enciclopedia Completa del Nen

- **6 Tipos de Nen**: Información detallada sobre Enhancer, Transmuter, Emitter, Conjurer, Manipulator y Specialist.
- **Técnicas Básicas**: Ten, Zetsu, Ren, Hatsu y sus aplicaciones.
- **Técnicas Avanzadas**: En, Gyo, In, Ken, Ko, Ryu, Shu y más.
- **Diseño Interactivo**: Animaciones fluidas y efectos visuales que representan el aura de cada tipo.

### 🧪 Quiz de Personalidad

- **Test Interactivo**: Responde preguntas diseñadas para determinar tu tipo de Nen basándose en tu personalidad.
- **Resultados Detallados**: Descubre tu tipo primario y secundario con explicaciones completas.
- **Compartir Resultados**: Comparte tu tipo de Nen en redes sociales con imágenes personalizadas.
- **Música Ambiental**: Experiencia inmersiva con música temática durante el quiz.

### 🔥 Generador de Hatsu con IA

- **Creación Personalizada**: Genera habilidades especiales únicas basadas en tu tipo de Nen.
- **Powered by Google AI**: Utiliza Gemini AI para crear Hatsu creativos y coherentes con el lore.
- **Estilos de Combate**: Elige entre diferentes estilos (Ofensivo, Defensivo, Soporte, etc.).
- **Descarga de Resultados**: Guarda tu Hatsu como imagen para compartir.

### 🎨 Diseño Premium

- **Tema Oscuro**: Diseño moderno con efectos de glassmorphism y gradientes vibrantes.
- **Animaciones Fluidas**: Micro-animaciones y transiciones suaves para una experiencia premium.
- **Responsive**: Optimizado para dispositivos móviles, tablets y desktop.
- **Efectos de Aura**: Partículas animadas y efectos visuales únicos para cada tipo de Nen.

---

## 🛠️ Stack Tecnológico

### Frontend

- **[SvelteKit](https://kit.svelte.dev/)** `^2.16.0` - Framework principal
- **[Svelte 5](https://svelte.dev/)** `^5.0.0` - Runes y reactividad moderna
- **[TypeScript](https://www.typescriptlang.org/)** `5.9.3` - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** `^4.1.18` - Estilos y diseño
- **[Vite](https://vitejs.dev/)** `^6.2.6` - Build tool y dev server

### Librerías y Herramientas

- **[@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)** `^0.24.1` - Integración con Gemini AI
- **[Chart.js](https://www.chartjs.org/)** `^4.5.1` - Visualización de datos
- **[html-to-image](https://www.npmjs.com/package/html-to-image)** `^1.11.13` - Generación de imágenes
- **[lz-string](https://www.npmjs.com/package/lz-string)** `^1.5.0` - Compresión de datos para URLs
- **[tailwind-animations](https://www.npmjs.com/package/tailwind-animations)** `^1.0.1` - Animaciones predefinidas

### Desarrollo

- **[Prettier](https://prettier.io/)** - Formateo de código
- **[svelte-check](https://www.npmjs.com/package/svelte-check)** - Validación de tipos

---

## 📦 Instalación

### Prerrequisitos

- **Node.js** >= 18.x
- **pnpm** (recomendado) o npm/yarn

### Pasos de Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/KevinKeyssx/The-art-of-the-nen.git
cd The-art-of-the-nen
```

2. **Instala las dependencias**

```bash
pnpm install
# o
npm install
# o
yarn install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto (ver [Variables de Entorno](#-variables-de-entorno))

4. **Inicia el servidor de desarrollo**

```bash
pnpm dev
# o
npm run dev
```

5. **Abre tu navegador**

Navega a `http://localhost:5173` (o el puerto que Vite asigne)

---

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Google Generative AI (Gemini)
# Obtén tu API key en: https://makersuite.google.com/app/apikey
PUBLIC_GEMINI_API_KEY=tu_api_key_aqui
```

### Obtener API Key de Google Gemini

1. Visita [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva API key
4. Copia la key y pégala en tu archivo `.env`

> ⚠️ **Importante**: Nunca compartas tu API key públicamente ni la subas a repositorios públicos.

---

## 🚀 Uso

### Desarrollo

```bash
# Inicia el servidor de desarrollo
pnpm dev

# Inicia el servidor y abre el navegador automáticamente
pnpm dev -- --open

# Verifica tipos de TypeScript
pnpm check

# Verifica tipos en modo watch
pnpm check:watch

# Formatea el código
pnpm format

# Verifica el formateo
pnpm lint
```

### Producción

```bash
# Construye la aplicación para producción
pnpm build

# Previsualiza la build de producción
pnpm preview
```

### Estructura del Proyecto

```
The-art-of-the-nen/
├── src/
│   ├── lib/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── types/          # Definiciones de tipos TypeScript
│   │   └── utils/          # Utilidades y helpers
│   ├── routes/
│   │   ├── (app)/
│   │   │   ├── quiz/       # Quiz de personalidad
│   │   │   └── invoke/     # Generador de Hatsu
│   │   ├── api/            # Endpoints de API
│   │   └── components/     # Componentes de páginas
│   ├── app.css             # Estilos globales
│   └── app.html            # Template HTML
├── static/                 # Archivos estáticos (fuentes, audio, etc.)
├── .env                    # Variables de entorno (no incluido en git)
└── package.json
```

---

## 🗺️ Roadmap

### 🚧 En Desarrollo

- [ ] **Sistema de Autenticación**: Login y registro de usuarios
- [ ] **Perfiles de Usuario**: Guarda tus resultados y Hatsu favoritos
- [ ] **Editor de Hatsu**: Edita y mejora tu Hatsu
- [ ] **Reglas del Nen**: Sección detallada sobre restricciones y condiciones
- [ ] **🎉 Funcionalidad Sorpresa**: Estoy trabajando en algo súper entretenido... ¡Mantente atento!

### 💡 Futuras Ideas

- [ ] Galería de Hatsu de la comunidad
- [ ] Sistema de votación para los mejores Hatsu
- [ ] Sistema de clasificación con ELO
- [ ] Modo multijugador para el modo de combate
- [ ] Soporte multiidioma (inglés, japonés)

---

## 🤝 Contribuir

Las contribuciones son lo que hace que la comunidad open source sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada**.

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Estilo

- Usa **tabs** para indentación
- Sigue las reglas de espaciado definidas en el proyecto
- Ejecuta `pnpm format` antes de hacer commit
- Asegúrate de que `pnpm check` pase sin errores

---

## 📄 Licencia y Créditos

### Créditos

Este proyecto es un fan-made basado en el manga y anime **Hunter x Hunter** creado por **Yoshihiro Togashi**.

> 🙏 Esperamos que Togashi-sensei termine la serie pronto y nos siga bendiciendo con más contenido del mundo de Hunter x Hunter.

Todo el contenido relacionado con Hunter x Hunter, incluyendo el sistema Nen, personajes y conceptos, son propiedad de Yoshihiro Togashi y sus respectivos licenciatarios.

### Disclaimer

Esta es una aplicación no oficial creada por fans para fans. No está afiliada, asociada, autorizada, respaldada por, o de ninguna manera oficialmente conectada con Yoshihiro Togashi, Shueisha, Madhouse, o cualquiera de sus subsidiarias o afiliados.

---

<div align="center">

**Hecho con ❤️ por fans de Hunter x Hunter**

⭐ Si te gusta este proyecto, considera darle una estrella en GitHub ⭐

[Reportar Bug](https://github.com/KevinKeyssx/The-art-of-the-nen/issues) · [Solicitar Feature](https://github.com/KevinKeyssx/The-art-of-the-nen/issues) · [Discusiones](https://github.com/KevinKeyssx/The-art-of-the-nen/discussions)

</div>
