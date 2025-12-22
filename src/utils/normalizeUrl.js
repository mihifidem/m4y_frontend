// Normaliza la URL para evitar dobles o faltantes de slash
export default function normalizeUrl(base, path) {
  if (!base) return path;
  if (!path) return base;
  if (base.endsWith("/") && path.startsWith("/")) {
    return base + path.slice(1);
  }
  if (!base.endsWith("/") && !path.startsWith("/")) {
    return base + "/" + path;
  }
  return base + path;
}
