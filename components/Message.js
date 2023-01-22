export default function Message({ user, data }) {
  return <div style={styles.messageWrap}>
    <div style={styles.avatarWrap}>
      <img src={user.avatar} style={styles.avatar} />
    </div>
    <div style={styles.message}>
      <div style={styles.header}>
        <span style={styles.username}>{user.username}</span> <span style={styles.time}>Today at {data.time}</span>
      </div>
      <div style={styles.content}>{data.content || ""}</div>
    </div>
  </div>
}

const styles = {
  time: {
    marginLeft: '7%',
    fontSize: '12px',
    color: '#a3a6aa'
  },
  messageWrap: {
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: '16px',
    background: '#36393f',
    color: 'rgb(220, 221, 222)',
    fontFamily: 'gg sans',
  },
  avatarWrap: {
    display: 'flex',
    width: '64px',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  username: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: '16px',
  },
  content: {},
}
