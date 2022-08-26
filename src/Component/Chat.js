import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Chat.css'
import {
    getCustomHour,
    getCustomMinute,
    getCustomSecond
} from "@hirishu10/simple-date-time";

export default function () {
    const hour = getCustomHour();
    const minute = getCustomMinute();
    const second = getCustomSecond();
    const [getchat, setGetChat] = useState([])
    const [chat, setChat] = useState('')

    const urlChat = 'http://localhost:3004/chat'

    const submitForm = (e) => {
        e.preventDefault();

        fetch(urlChat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chat)
        })
        e.target[0].value = ''
        e.target[1].value = ''
    }

    const getChat = () => {
        fetch('http://localhost:3004/chat')
            .then((response) => response.json())
            .then((data) => {
                setGetChat(data)
            });
    }

    useEffect(() => {
        getChat();
    }, [getChat])

    const chaneValue = (e) => {
        e.preventDefault();

        const data = { ...chat }

        data[e.target.name] = e.target.value

        setChat(data)
    }

    return (

        <div>
            <header className="page-header">
                <div className="container ">
                    <h2>Sumale</h2>
                </div>
            </header>
            <div className="main">
                <div className="container ">
                    <div className="chat-log">
                        {
                            getchat.map(item => {
                                if (item.name === 'Máy') {
                                    return (
                                        <div key={item.id} className="chat-log__item">
                                            <h3 className="chat-log__author">{item.name} <small>
                                                {hour}:
                                                {minute}
                                            </small></h3>
                                            <div className="chat-log__message">{item.chat}</div>
                                        </div>
                                    )
                                }
                                if (item.name === 'Người') {
                                    return (
                                        <div key={item.id} className="chat-log__item chat-log__item--own">
                                            <h3 className="chat-log__author">{item.name} <small>
                                                {hour}:
                                                {minute}</small></h3>
                                            <div className="chat-log__message">{item.chat}</div>
                                        </div>
                                    )
                                }
                                return (
                                    <div key={item.id} className="chat-log__item chat-log__item--own">
                                        <h3 className="chat-log__author">{item.name} <small>
                                            {hour}:
                                            {minute}</small></h3>
                                        <div className="chat-log__message">{item.chat}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="chat-form">
                    <div className="container ">
                        <form className="form-horizontal" onSubmit={submitForm}>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-sm-5 col-xs-8">
                                    <input onChange={chaneValue} type="text" className="form-control mb-1" name='name' placeholder="Name" />
                                    <input onChange={chaneValue} type="text" className="form-control" name='chat' placeholder="Message" />
                                </div>
                                <div className="col-sm-2 col-xs-4">
                                    <button type="submit" className="btn btn-success btn-block">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
