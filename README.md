# 💸 Control de Gastos - Proyecto Avanzado con React + Vite

Este proyecto ha sido desarrollado como parte de mi aprendizaje avanzado en **React**, explorando **gestión de estado compleja**, **API Context**, **reducers con múltiples acciones** y técnicas de optimización de rendimiento mediante distintos hooks de React.  
Se trata de un proyecto robusto que me permitió enfrentar situaciones con **mucha lógica condicional**, múltiples interacciones del usuario y gestión de datos dinámicos.

---

## 🚀 Descripción

El proyecto es una **aplicación web para controlar gastos personales**, que permite al usuario:

- Establecer un presupuesto inicial.
- Añadir, editar y eliminar gastos.
- Filtrar gastos por categoría.
- Visualizar gastos en tiempo real y actualizar la UI automáticamente.
- Reiniciar la aplicación para empezar desde cero.
- Interactuar con componentes avanzados e importados de librerías externas como **calendario**, **listas deslizables** y **barras de progreso circulares**.

---

## 🧠 Arquitectura y Gestión de Estado

Se ha trabajado con **React Hooks** avanzados y patrones de gestión de estado:

### 1️⃣ useState
- Manejo de estados simples como valores de inputs, modal abierto/cerrado, filtros temporales, etc.

### 2️⃣ useReducer
- Gestión de estado más complejo mediante un **reducer centralizado** que maneja todas las operaciones sobre presupuesto, gastos y filtros.
- Permite acciones como: añadir o eliminar gastos, actualizar el presupuesto, mostrar/ocultar modal, aplicar filtros y reiniciar la aplicación.
- Facilita la **escalabilidad**, el mantenimiento del código y la consistencia de la lógica.

### 3️⃣ API Context
- Se introdujo e implementó por primera vez un **contexto global (`ApiContext`)** para evitar el paso excesivo de props entre componentes.
- Permite que cualquier componente acceda a los estados y acciones del reducer directamente.
- Mejora la **organización** y mantiene el código limpio y modular.

---

## 🛠️ Funcionalidades destacadas

- **Modal dinámico** para añadir o editar gastos.
- **Filtros de categorías** para mostrar solo los gastos relevantes.
- **Validaciones y lógica condicional** para evitar inconsistencias en el presupuesto o gastos.
- **Reinicio completo** de la aplicación.
- **Optimización de rendimiento** mediante `useMemo` y estructuras de estado bien definidas.
- Integración con **react-calendar** para selección de fechas.
- **Swipeable Lists** para editar y eliminar gastos mediante gestos de deslizamiento.
- **React Circular Progressbar** para visualizar el porcentaje de gasto respecto al presupuesto.
- Diseño responsive y moderno con **Tailwind CSS**.

---

## 🌐 Proyecto desplegado

Puedes probar la aplicación directamente aquí:  
🔗 [Ver en Netlify](https://control-gastos164.netlify.app/)

---

## 🛠️ Tecnologías y dependencias utilizadas

- **React** con **Vite**
- **TypeScript**
- **React Hooks** (`useState`, `useReducer`, `useMemo`, `useEffect`, custom hooks)
- **API Context** para gestión global de estado
- **Tailwind CSS** para diseño responsive
- **react-calendar** para selección de fechas
- **react-swipeable-list** para edición y eliminación de gastos mediante gestos
- **react-circular-progressbar** para visualización de progreso del presupuesto
- **Netlify** para despliegue
