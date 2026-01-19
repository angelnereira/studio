# 🔀 Instrucciones para Unificar Ramas en Main

## Estado Actual

**Rama con todos los cambios:** `claude/refactor-firebase-01RDxvWmZczKtJZSxyidkzxT`

Esta rama contiene:
- ✅ Calculadora de presupuestos completa
- ✅ Sistema de blog con MDX y SEO
- ✅ Primer artículo (SAGO-FACTU case study)
- ✅ **FIX para deployment:** Conflictos de React/MDX resueltos

## Paso 1: Hacer Merge a Main

### Opción A: Via Pull Request (Recomendado)

1. **Ve a:** https://github.com/angelnereira/studio/compare
2. **Configura:**
   - Base: `main`
   - Compare: `claude/refactor-firebase-01RDxvWmZczKtJZSxyidkzxT`
3. **Crea PR** con título: "Final: Unificar todos los cambios en main"
4. **Merge inmediatamente** (usa "Squash and merge" para historia limpia)

### Opción B: Merge Directo (si desprotegiste main)

```bash
git checkout main
git merge claude/refactor-firebase-01RDxvWmZczKtJZSxyidkzxT --no-edit
git push origin main
```

## Paso 2: Eliminar Ramas Antiguas

Una vez mergeado a main, elimina las ramas obsoletas:

### Desde GitHub UI:

1. Ve a: https://github.com/angelnereira/studio/branches
2. Elimina:
   - ✗ `claude/refactor-firebase-01RDxvWmZczKtJZSxyidkzxT`
   - ✗ `claude/reviosa-es-01GYBTRy8azEAZuFppwfspJq`
   - ✗ `Pre-Produccion`

### Desde Terminal:

```bash
# Eliminar ramas remotas
git push origin --delete claude/refactor-firebase-01RDxvWmZczKtJZSxyidkzxT
git push origin --delete claude/reviosa-es-01GYBTRy8azEAZuFppwfspJq
git push origin --delete Pre-Produccion

# Eliminar ramas locales
git checkout main
git branch -D claude/refactor-firebase-01RDxvWmZczKtJZSxyidkzxT
git branch -D claude/reviosa-es-01GYBTRy8azEAZuFppwfspJq
git branch -D Pre-Produccion

# Limpiar referencias
git remote prune origin
```

## Paso 3: Configurar Main como Default

1. **Settings → General → Default branch**
2. Cambiar a `main` (si no lo está ya)
3. **Save**

## Paso 4: Configurar Vercel

1. **Vercel Dashboard → Settings → Git**
2. **Production Branch:** `main`
3. **Save**

Después del merge, Vercel hará un deployment automático con todos los fixes! ✅

---

**Archivo generado automáticamente. Puedes eliminarlo después del merge.**
