import React, { useState, createRef, useRef, useEffect } from 'react';
import { Card, message, Textarea, Tooltip } from 'tdesign-react'
import { EnterIcon, LoadingIcon } from 'tdesign-icons-react'
import { debound } from '../../utils'
import MsgItem, { MsgItemRobot } from '../msgItem'
import { storage } from '../../utils'
import dayjs from 'dayjs'

export default function IM() {
    const [text, setText] = useState('')
    const [IconType, setIconType] = useState<typeof LoadingIcon|typeof EnterIcon>(EnterIcon)
    const [msgGroup, setMsgGroup] = useState(storage.getMsgGroupList())
    
    const fetchData = async () => {
        try {
            const value = text
            if (!value.trim()) {
                message.warning('你要先输入! ? !')
                return
            }
            setText('')
            const meMsgInfo = {
                timeFormat: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                msg: value
            }
            msgGroup.me.push(meMsgInfo)
            storage.syncMsgGroupList(msgGroup)
            setMsgGroup({...msgGroup})            
            setIconType(LoadingIcon)
            requestAnimationFrame(() => {
                toBottom()
            })
            const response = await fetch(`https://gmlook.top/chat/openai/gpt?prompt=${value}`)  
            const reader = response.body?.getReader() as ReadableStreamDefaultReader
            readData(reader)
        } catch (e) {
            console.error(e)
        }        
    }

    async function readData(reader: ReadableStreamDefaultReader) {
        const o = await reader.read()
        const textDecoder = new TextDecoder()
        const text = textDecoder.decode(o.value)
        const meMsgLen = msgGroup.me.length
        const robotMsgIdx = meMsgLen - 1
        setMsgGroup(msgGroup => {
            if (msgGroup.robot[robotMsgIdx]) {
                msgGroup.robot[robotMsgIdx].msg += text
            } else {
                msgGroup.robot[robotMsgIdx] = {
                    timeFormat: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    msg: text
                }
            }
            return {...msgGroup}
        })   
        toBottom()
        if (!o.done) {  
             readData(reader)        
        } else {
            storage.syncMsgGroupList(msgGroup)
            setIconType(EnterIcon)
        }
    }



    const onSend = debound(() => {
        fetchData()
    }, 300)

    const onEnter = (text: string, {e: event}:{e: React.KeyboardEvent<HTMLTextAreaElement>}) => {        
        if (event.code === 'Enter') {
            event.preventDefault()
            fetchData()
        } else {
            setText(text)
        }
    }

    const container = useRef<any>()
    const toBottom = () => {
        const el = container.current as HTMLDivElement
        el && (el.scrollTop = (el.firstElementChild as HTMLDivElement).offsetHeight)
    }

    useEffect(() => {
        toBottom()
    }, [])

    return (
        <Card
            title="gpt3.5"
            headerBordered
            style={{ height: '100%' }}
            footer={(
                <footer className="footer">
                    <Textarea 
                        value={text}
                        autosize={{ minRows: 2, maxRows: 2 }} 
                        onChange={v => setText(v)}
                        onKeypress={onEnter}
                        placeholder="please enter your question"
                    />
                    <Tooltip content={IconType === EnterIcon ? 'send' : 'loading'}>
                        <IconType 
                            style={{ fontSize: 35, cursor: 'pointer' }} 
                            onClick={IconType === EnterIcon ? onSend : void 0}
                        />
                    </Tooltip>                    
                </footer>
            )}
        >
            <div className="msg-list" ref={container}>
                <div>
                    {
                        msgGroup.me.map((item, index) => (
                            <React.Fragment key={index}>
                                <MsgItem msg={item.msg} timeFormat={item.timeFormat} />
                                {
                                   msgGroup.robot[index] && (
                                        <MsgItemRobot
                                            msg={msgGroup.robot[index].msg} 
                                            timeFormat={msgGroup.robot[index].timeFormat} 
                                        />
                                   ) 
                                }                                
                            </React.Fragment>
                        ))
                    }
                </div>                
            </div>
        </Card>
    )
}