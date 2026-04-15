# ARLibro Landing

Proyecto estático para la landing de ARLibro.

## Estructura

```text
arlibro/
├── index.html
├── README.md
├── supabase-setup.sql
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── hero.css
    │   ├── how.css
    │   ├── stats-widget.css
    │   └── tesis.css
    └── js/
        ├── main.js
        ├── stats-widget.js
        ├── supabase.js
        └── modules/
            ├── cursor.js
            ├── nav-scroll.js
            ├── starfield.js
            └── step-reveal.js
```

## Qué se mejoró

- Se separó el código en archivos más legibles:
  - `index.html`: estructura y carga de assets
  - `assets/css/*.css`: estilos por responsabilidades
  - `assets/js/modules/*.js`: interacciones separadas por feature
  - `assets/js/main.js`: inicializador general
- Se eliminó el archivo monolítico para evitar duplicidad de estilos y simplificar el mantenimiento.

## Cómo ejecutar

1. Abre `index.html` en tu navegador.
2. Opcional: usa una extensión como Live Server en VS Code para recarga en caliente.

## Próximos pasos recomendados

- Separar secciones del HTML en componentes (si luego migras a un framework).
- Añadir carpeta `assets/img/` para imágenes reales del producto.
- Incorporar pruebas básicas de UI (por ejemplo con Playwright).
