import { message } from "tdesign-react"

export function debound(callback: (...args: any) => void, delay: number) {
    let timer: any = null
    return (...args: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, delay)        
    }
}


interface MsgItem {
    timeFormat: string
    msg: string
}
interface MsgGroup {
    me: MsgItem[]
    robot: MsgItem[]
}


const MSG_GROUP_LIST = 'MSG_GROUP_LIST'
const UUID = 'UUID'
class Storage {
    private msgGroupList: MsgGroup = {me: [], robot: []}

    constructor() {
        this.init()
    }

    init() {
        try {
            const result = JSON.parse(localStorage.getItem(MSG_GROUP_LIST) as string)
            if (!result) {
                throw new TypeError()
            }
            this.msgGroupList = result
        } catch {
            this.msgGroupList = {
                me: [],
                robot: []
            }
            const msgGroupTemplate = JSON.stringify(this.msgGroupList)
            
            localStorage.setItem(MSG_GROUP_LIST, msgGroupTemplate)
        }
    }

    getMsgGroupList() {
        return this.msgGroupList
    }

    syncMsgGroupList(msgGroupList: MsgGroup) {
        this.msgGroupList = msgGroupList
        localStorage.setItem(MSG_GROUP_LIST, JSON.stringify(this.msgGroupList))
    }

    setUUID(uuid: string) {
        localStorage.setItem(UUID, uuid)
    }

    getUUID() {
        return localStorage.getItem(UUID)
    }
}

export const storage = new Storage()    

export function copyCode() {
    document.querySelectorAll('pre code').forEach(code => {
        (code as HTMLElement).onclick = async (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const originCode = target.innerText
            await navigator.clipboard.writeText(originCode)
            message.success('copy success!')
        }
    })
}