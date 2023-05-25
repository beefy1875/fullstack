const Notification = ({msg}) => {
    if(msg === null) {
        return null
    }

    console.log(msg)
    const msgToDisplay = msg.msg
    const msgType = msg.type

    console.log(msgType)

    return (
        <div className={msgType}>
            {msgToDisplay}
        </div>
    )
}


export default Notification