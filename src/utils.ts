export function debound(callback: (...args: any) => void, delay: number) {
    let timer: any = null
    return (...args: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, delay)        
    }
}