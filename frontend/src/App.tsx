import { useEffect, useState } from 'react'
import './App.css'

type User = {
  id: number,
  username: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const load = async () => {
      const url = "/api/users"
      const data = await fetch(url)
      const users = await data.json() as User[]
      setUsers(users)
    }
    load()
  }, [])

  return (
    <>
      <h1>Users</h1>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.username}</li>)
        }
      </ul>
    </>
  )
}

export default App
