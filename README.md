# Cosmos.edu - Plataforma Educativa de Cosmología

Bienvenido al repositorio de **Cosmos.edu**, una plataforma interactiva y educativa diseñada para explorar el universo, desde el Big Bang hasta la red cósmica de materia oscura.

## 🚀 Características Principales

La plataforma se divide en 4 módulos educativos principales:
1. **Big Bang:** Los orígenes del universo.
2. **Galaxias:** Formación y evolución galáctica.
3. **Agujeros Negros:** Exploración profunda de singularidades.
4. **Materia Oscura:** La estructura invisible del cosmos.

### 🕳️ Simulador Interactivo Relativista (GRRT)
Dentro del módulo de Agujeros Negros (y accesible vía `/public/simulador-grrt/`), la plataforma cuenta con un potente motor de renderizado de agujeros negros en tiempo real. 

Características del simulador:
- **Trazado de Rayos Relativista (GRRT):** Cálculo de trayectorias fotónicas en tiempo real (Métricas de Kerr y Schwarzschild).
- **Física Precisa:** Simulación del Disco de Acreción, asimetría por Efecto Doppler (corrimiento térmico al rojo/azul) y jets magnéticos.
- **Modelo M87*:** Configurado por defecto para visualizar un agujero negro supermasivo realista con plasma MAD (Magnetically Arrested Disk) de alta rotación.
- **Interfaz (HUD):** Una interfaz tipo "Head-Up Display" diseñada para la máxima inmersión científica, ofreciendo telemetría dinámica y controles de órbita.

## 💻 Desarrollo y Despliegue

Este proyecto está construido combinando una aplicación principal (posiblemente React/Vite) para el flujo educativo, junto con `Three.js` y `WebGL` (mediante shaders GLSL personalizados) para la simulación relativista.

### Instalación local
Para ejecutar el proyecto en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/explorador-cosmico.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

*(Si deseas visualizar únicamente el simulador de forma independiente, puedes servir directamente el archivo estático `public/simulador-grrt/index.html` con cualquier servidor HTTP).*

## 🎨 Diseño y UI
La estética de la plataforma sigue un moderno lenguaje visual tipo *Glassmorphism* para paneles informativos, combinado con pantallas inmersivas (*Canvas Fullscreen*) y una tipografía meticulosa (`Inter`, `Space Grotesk`, y `Space Mono` para datos técnicos) basada en nuestros últimos prototipos de Figma.

---
*Explorando el cosmos de forma interactiva.*
