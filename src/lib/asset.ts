// Préfixe un chemin d'asset statique avec le basePath (ex. /localservice sur
// GitHub Pages). En local basePath est vide, donc le chemin reste inchangé.
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
