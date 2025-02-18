/**
 * Função para formatar datas na aplicação.
 * @param date Data no formato Date ou string ("2024-09-20T21:20:54.315Z")
 * @returns Retorna uma string com a data formatada (dd/mm/aaaa)
 */

export function formatedDate(date: string | Date) {
    if (typeof date === 'string') date = new Date(date)

    if (isNaN(date.getTime()) || !(date instanceof Date)) return
    return date.toLocaleDateString('pt-br', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC'
    })
}