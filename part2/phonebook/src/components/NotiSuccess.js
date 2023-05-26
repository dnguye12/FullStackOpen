const NotiSuccess = ({ message, success }) => {
    if (message === null || message.length === 0) {
        return (
            <div>
                {message}
            </div>
        )
    }
    return (
        <div className='noti noti-success'>
            {message}
        </div>
    )

}

export default NotiSuccess;