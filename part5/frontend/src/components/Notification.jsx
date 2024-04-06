const Notification = (props) => {
    const notificationStyle = {
        color: props.error ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (props.notification === null) 
        ? null
        : (<div style={notificationStyle}> {props.notification} </div>)
}

export default Notification