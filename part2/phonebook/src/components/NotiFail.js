const NotiFail = ({ message, success }) => {
    if (message === null || message.length === 0) {
        return (
            <div>
                {message}
            </div>
        )
    }
    return (
        <div className='noti noti-fail'>
            {message}
        </div>
    )

}

export default NotiFail;