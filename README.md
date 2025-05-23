# Sistema de Administración y Visualización de Puntos de Venta

Este sistema Full Stack permite gestionar puntos de venta y visualizar sus ventas por zona geográfica mediante un mapa interactivo y un gráfico de distribución. El proyecto está compuesto por:

- **Frontend**: Aplicación React con TailwindCSS , Leaflet para visualización en mapa y Recharts para generación de gráfica.
- **Backend**: API REST construida con .NET Core y Entity Framework.
- **Base de Datos**: SQL Server.

## 🗂️ Estructura del Proyecto

```text
/repo-root
├── frontend/                 # Aplicación React (Leaflet + Recharts + TailwindCSS)
│   ├── public/              # Archivos estáticos
│   ├── src/                 # Código fuente del frontend
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Vistas principales
│   │   ├── api/             # Servicios API para consumir backend
│   │   └── types/
        └── router/           # Definición para navegación entre páginas
│   ├── index.html
│   └── vite.config.ts
│
├── backend/                 # API REST con .NET Core
│   ├── PuntoVenta.Application
│   ├── PuntoVenta.Domain
│   ├── PuntoVenta.Infrastructure
│   ├── PuntoVentaAPI
│   └── Program.cs           # Punto de entrada de la aplicación
│
├── database/                # Scripts de base de datos (SQL Server)
│   ├── scripts/
│       ├── init.sql 
│
├── .gitignore
├── README.md
```



## 🌐 Funcionalidades Principales
- **CRUD de puntos de venta**

- **Visualización geográfica (Leaflet) con marcadores dinámicos**

- **Gráfico de pastel con ventas por zona (Recharts)**

- **Autoajuste del mapa al cargar puntos**

- **Indicador de carga mientras se obtiene la información**

- **Manejo de estados sin datos**

- **Diseño responsivo con TailwindCSS**

## 📸 Capturas

![image](https://github.com/user-attachments/assets/b6bd0d79-1381-40e1-b829-ad2d356e14c4)

![image](https://github.com/user-attachments/assets/73b42b8b-554f-44eb-9f5c-c3b31375e9c7)

![image](https://github.com/user-attachments/assets/413a8d20-28fd-48c9-8013-bc704c9d5d9d)

## 📸 Video del funcionamiento
https://www.loom.com/share/8f15ecb140d541bf88cfcecf63776f08?sid=507e2c6f-43e2-4f2e-b82d-83bc1f29049c


## 🧑‍💼 Contacto
 - Desarrollador por: **José Salvador Lopez Balleza**
 - Email: **jslb_cafcb10@hotmail.com**




