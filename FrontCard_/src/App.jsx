import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import _card from './card'
import _loading from './loading'
import axios from 'axios'
import _popUp from './popUp'

function App() {
  const [click, setClick] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(()=> {
    document?.querySelector('.login-btn').addEventListener('click', ()=> {
      window.location.href = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-70a340a6617a9722976d0ee642b6b45a291170f0f81c7ab5e27b97fc15040263&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fget%2F&response_type=code'
    })
  }, [])

  useEffect(()=> {

    var query = location.search
    var error = query?.split('?')
    if (error[1])
      var accessToken = error[1].replace('access=', '')
    else
      return setClick(false)

    if (accessToken.indexOf('status=') == -1) {
      axios.get(`http://localhost:8000/sessionData/?access=${accessToken}`)
      .then(response => {
        sessionStorage.setItem('studentLog', JSON.stringify(response.data))
        setClick(true)
      })
      .catch(error => {
        setStatus('token expired')
      })
    } else {
      var errorMessage = error[1].replace('status=', '')
      setStatus(errorMessage)
    }
  }, [])

  return (
    <>
      {
        click && status == '' ?
        <div><_card/><_popUp error={'success'}/></div>:
        location.query?.split('?')[1].indexOf('access=') == -1 || status == 'token expired' ?
        <div><_loading/><_popUp error={status || 'undefined'}/></div>:
        <_loading/>
      }
    </>
  )
}

export default App
