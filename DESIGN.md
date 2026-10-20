# Regla Permanente de Diseño & Sistema de Diseño: MIPEUE

## 1. Filosofía Anti-Slop (Cero AI Slop)
Queda estrictamente prohibido en todo el diseño y código del frontend de MIPEUE:
- **Degradados genéricos:** Prohibidos los gradientes morado/azul/cyan clichés de plantillas de IA o SaaS moderno.
- **Elementos flotantes innecesarios:** Sin botones de acción flotantes (FABs) sin justificación ergonómica o blobs decorativos difuminados que ensucien la visual.
- **Tarjetas repetitivas con sombras excesivas:** Prohibido el uso de tarjetas genéricas (*cards*) con `box-shadow` desproporcionado o efectos de elevación predecibles.
- **Tipografías de sistema genéricas o aburridas:** Prohibido recurrir a fuentes por defecto (`Arial`, `Segoe UI`, `system-ui`) para la identidad principal sin un tratamiento de kerning, tracking y jerarquía tipográfica editorial.

---

## 2. Identidad de Marca Oficial MIPEUE

### Atmósfera & Estilo Visual
- **Concepto:** Editorial de moda streetwear nicaragüense, nocturna, mística, folclórica y contemporánea.
- **Sensación:** Siluetas limpias, contraste cinematográfico, alta sofisticación artesanal y vibra urbana de alta costura callejera.
- **Tipografía:**
  - *Títulos y Nombres de Drop:* Mayúsculas contundentes, pesadas y expresivas con espaciado (*tracking*) refinado.
  - *Detalles, Especificaciones y Badges:* Sans-serif geométrica/grotesca minimalista y legible en baja escala.

### Paleta de Color Oficial (Paleta Cerrada)
No se deben introducir colores fuera de esta paleta oficial sin aprobación explícita:

| Token / Nombre | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| **Forest Green (Principal)** | `#0e3831` | Navbar, fondo base y acentos principales |
| **Deep Teal (Secundario)** | `#153d35` | Tops raglan, estados hover y capas de profundidad |
| **Deep Crimson / Burgundy** | `#5c1d24` | Drop temático **Cadejo** |
| **Dark Slate Blue** | `#1f2a33` | Drop temático **La Cegua** |
| **Warm Cream / Light Beige** | `#e6e1d5` | Textos secundarios, fichas técnicas, precios y badges |
| **Pure White** | `#ffffff` | Tipografía de alto contraste en titulares |

---

## 3. Dinámica e Interacciones UI/UX

### Showcase Slider Horizontal Fluido
- **Navegación:** Transición horizontal fluida hacia la derecha para alternar entre las prendas destacadas:
  1. *Cadejo* (Fondo / atmósfera acentuada con `#5c1d24`)
  2. *La Cegua* (Fondo / atmósfera acentuada con `#1f2a33`)
  3. *Top Muy Deacachimba* (Fondo / atmósfera acentuada con `#0e3831` / `#153d35`)
  4. *Top Nicaragua* (Fondo / atmósfera acentuada con `#153d35` / `#0e3831`)
- **Transición Cromática de Fondo:** El fondo reacciona de manera armónica al cambiar de modelo o prenda mediante transiciones suaves (`cubic-bezier`).
- **Selector de Tallas Interactivo:** Componente de selección táctil y de cursor, con retroalimentación inmediata de disponibilidad y estado activo estilizado con Warm Cream y bordes nítidos.
- **Preview Miniatura:** Vista previa o thumbnail flotante en el lateral inferior que anticipa el siguiente modelo a descubrir en el showcase.
