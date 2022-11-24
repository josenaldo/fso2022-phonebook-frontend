import React from 'react'
import PropTypes from 'prop-types'
import './Notification.css'

const NOTIFICATION_LEVELS = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return <div className={` alert ${message.level}`}>{message.text}</div>
}

Notification.propTypes = {
    message: PropTypes.shape({
        text: PropTypes.string.isRequired,
        level: PropTypes.oneOf([
            NOTIFICATION_LEVELS.SUCCESS,
            NOTIFICATION_LEVELS.ERROR,
            NOTIFICATION_LEVELS.INFO,
        ]).isRequired,
    }).isRequired,
}

export { Notification, NOTIFICATION_LEVELS }
