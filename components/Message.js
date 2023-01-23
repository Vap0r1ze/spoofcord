export default function Message({ user, query }) {
  return <div style={styles.messageWrap}>
    <div style={styles.avatarWrap}>
      <img src={user.avatar} style={styles.avatar} />
    </div>
    <div style={styles.message}>
      <div style={styles.header}>
        <span style={{
          ...styles.username,
          color: query.color && `#${query.color}`, // I wanna test if this breaks
        }}>{query.name || user.username}</span>
        <span style={styles.time}>{query.time}</span>
      </div>
      <div style={styles.content}>{query.content || ""}</div>
    </div>
  </div>
}

const styles = {
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
    width: '56px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: '16px',
  },
  username: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: '16px',
  },
  content: {},
  time: {
    marginLeft: '8px',
    fontSize: '12px',
    color: '#a3a6aa'
  },
}
