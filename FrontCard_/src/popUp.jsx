import { useEffect } from 'react'
import './popUp.css'
import gsap from 'gsap'

function popUp({error}) {
	useEffect(()=> {
		gsap.fromTo('#process', {x: 200}, {x: 0})
		setTimeout(()=> gsap.fromTo('#process', {x: 0, display: 'block'}, {x: 260, display: 'none'}), 2000)
	}, [])
	return (
		<>
			{
				error == 'success'?
				<div id='process' className="succeed">{error}</div>:
				<div id='process' className="error">{error}</div>
			}
		</>
	)
}

export default popUp