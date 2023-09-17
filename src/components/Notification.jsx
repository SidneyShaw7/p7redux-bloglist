const Notification = ({ notification, style }) => {
  return notification === null ? null : (
    <div className={style ? 'success' : 'error'}>{notification}</div>
  )
}

export default Notification
