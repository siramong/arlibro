# ARLibro Landing

Proyecto estático para la landing de ARLibro.

## Estructura

```text
arlibro/
├── index.html
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── main.js
```

## Qué se mejoró

- Se separó el código en archivos más legibles:
  - `index.html`: estructura del contenido
  - `assets/css/styles.css`: estilos
  - `assets/js/main.js`: comportamiento e interacciones
- Se dejó una base simple para escalar el proyecto sin tener todo en un único archivo.

## Cómo ejecutar

1. Abre `index.html` en tu navegador.
2. Opcional: usa una extensión como Live Server en VS Code para recarga en caliente.

## Próximos pasos recomendados

- Separar secciones del HTML en componentes (si luego migras a un framework).
- Añadir carpeta `assets/img/` para imágenes reales del producto.
- Incorporar pruebas básicas de UI (por ejemplo con Playwright).
