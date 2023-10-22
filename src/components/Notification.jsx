import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notifications }) => {
    return notifications.message && notifications.message
  })

  const style = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margiTop: 10,
  }

  return <div style={notification && style}>{notification}</div>
  // return notifications === null ? null : (
  //   <div className={style ? 'success' : 'error'}>{notification}</div>
  // )
}

export default Notification
