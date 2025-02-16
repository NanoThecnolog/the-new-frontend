/**
 * Função para debug no console.log em desenvolvimento
 * @param args Argumentos para debugar no console
 */

export function debug(...args: any[]) {
    const enviroment = process.env.NEXT_PUBLIC_DEBUG
    if (!enviroment) return console.log("variável de ambiente não definida")
    if (enviroment === "development") {
        console.log(...args)
    }
}