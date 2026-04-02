export function classNames(...names: unknown[]): string {
    return names.filter(name => typeof name === "string")
        .map(name => name.trim())
        .filter(name => name.length > 0).join(" ")
}