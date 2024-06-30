import { useEffect, useState } from 'react'
import axios from 'axios';
import './card.css'
import './queries.css'
import gsap from 'gsap';

function Infos({name, score}) {
	return (
		<div className="empty">
			<div className="name">
				<li data-value={name} className='PrName'>{name}</li>
			</div>
			<div className="score">
				<li data-value={score} className='PrScore'>{score}</li>
			</div>
		</div>
	)
}

function Projects({name, score}) {
	return (
		<div className="empty">
			<div className="name">
				<li data-value={name} className='PrName'>{name}</li>
			</div>
			<div className="score">
				<li className='PrScore'>{score}</li>
			</div>
		</div>
	)
}


function Card() {
	const [array, SetArray] = useState([])
	const [fullname, setFullname] = useState('Nassi Mohammed')
	const [image, setImage] = useState('/profile.jpg')
	const [login, setLogin] = useState('mnassi')
	const [level, setLevel] = useState(0.01)
	
	const [campus, setCampus] = useState('-')
	const [title, setTitles] = useState('-')
	const [corrPoints, setCorrPoints] = useState(0)
	const [wallet, setWallet] = useState(0)
	const [email, setEmail] = useState('-')
	const [promo, setPromo] = useState('1st')
	const [phone, setPhone] = useState('0618234576')

	useEffect(()=> {

		const data = sessionStorage.getItem('studentLog')
		if (data) {
			const resp = JSON.parse(data)
			SetArray(resp.projects_users)
			setFullname(resp.usual_full_name)
			setLogin(resp.login)
			setImage(resp.image.versions.small)
			setLevel(resp.cursus_users[1].level)

			setCampus(resp.campus[0].name)
			console.log(resp.titles[0])
			if (resp.titles[0] != undefined)
				setTitles(resp.titles[0].name.split(' ')[0])
			setCorrPoints(resp.correction_point)
			setWallet(resp.wallet)
			setEmail(resp.email)
			setPromo(parseInt((resp.pool_year - 2018)) + 1)
			setPhone(resp.phone)
			document.getElementById('line').style.width = `${(resp.cursus_users[1].level).toString().split('.')[1]}%`
		}
	}, [])

	useEffect(()=> {
		let inter = 0
		const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ "
		const element = document.querySelector('h1')

		function animation() {
			const exit = setInterval(()=> {
				element.innerText = element.innerText.split("")
				.map((letter, index) => {
					if (index < inter)
						return element.dataset.value[index]
					return ALPHABET[Math.floor(Math.random() * 26)]
				})
				.join("")

				if (inter >= element.dataset.value.length) clearInterval(exit)
				inter += 1 / 3
			}, 30)
		}
		animation()
	}, [])

	useEffect(()=> {
		gsap.fromTo('.cardDesign', { x: '300%' }, { duration: 2, x: '0%' });
	  }, [])

	return (
		<div className="container">
			<div className="card">
				<div className="cardDesign"></div>
				<div className="first_part">
					<div className="profile">
						<img src={image || '/profile.jpg'}></img>
					</div>
					<div className="student">
						<div className="fullname">
							<h1 data-value={fullname}>{fullname}</h1>
						</div>
						<div className="login">
							<h1>{login}</h1>
						</div>
					</div>
					<div className="logo">
						<img src='1337.svg'></img>
					</div>
				</div>
				<div className="second_part">
					<div className="infos">
						<Infos className='head' name='name' score='value'/>
						<Infos name='campus' score={campus}/>
						<Infos name='titles' score={title}/>
						<Infos name='correction_points' score={corrPoints}/>
						<Infos name='wallet' score={wallet}/>
						<Infos name='email' score={email}/>
						<Infos name='promo' score={promo + 'th'}/>
						<Infos name='phone' score={phone}/>
					</div>
					<div className="progress">
						<div className="level">
							<div id='line' className="line"></div>
							<h1>{level}%</h1>
						</div>
						<div className="projects">
							<Projects className='head' name='name' score='score'/>
							{
								array.map((project, index) => {
									if (project['validated?'] == true) return <Projects key={index} name={project.project.name} score={project.final_mark}/>
								})
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function main_() {
	return (
		<Card/>
	)
}

export default main_