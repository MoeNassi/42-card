import './loading.css'
import './queriesL.css'

function Loading() {
	return (
		<div className="container_">
			<div className="card_">
				<div className="first_part_">
					<div className="profile_">
						<div className="picture_"></div>
					</div>
					<div className="student_">
						<div className="fullname_"></div>
						<div className="login_"></div>
					</div>
					<div className="logo_"></div>
				</div>
				<div className="second_part_">
					<div className="infos_"></div>
					<div className="progress_">
						<div className="level_"></div>
						<div className="projects_"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

function Button() {
	return (
		<button className='login-btn'>login</button>
	)
}

function loading_() {
	return (
		<div><Loading/><Button/></div>
	)
}

export default loading_