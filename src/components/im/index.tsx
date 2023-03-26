import React, { useState } from 'react';
import { Card, message, Textarea, Tooltip } from 'tdesign-react'
import { EnterIcon, LoadingIcon } from 'tdesign-icons-react'
import { debound } from '../../utils'

export default function IM() {
    const [text, setText] = useState('')
    const [IconType, setIconType] = useState<typeof LoadingIcon|typeof EnterIcon>(EnterIcon)

    const fetchData = () => {
        try {
            const value = text
            if (!value.trim()) {
                message.warning('你要先输入! ? !')
                return
            }
            setText('')
            setIconType(LoadingIcon)
            fetch('https://gmlook.top/chat/openai/gpt?prompt=nginx配置流式输出').then(data => data.text()).then(data => {
                console.log(data)
                setIconType(EnterIcon)
            })        
            // setTimeout()
        } catch (e) {
            console.error(e)
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
            <div className="msg-list">

            </div>
        </Card>
    )
}