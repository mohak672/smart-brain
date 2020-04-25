import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ( {imgUrl, box} ) => {

	return(

			<div className='center ma'>
				<div className='absolute mt3'>
					<img id='imgBox' alt='' src={imgUrl} width ='500px' height = 'auto'/>
					<div className='bounding-box' style={ {top:box.topRow, left:box.leftCol, bottom:box.bottomRow, right:box.rightCol} }></div>
				</div>
			</div>
		);


}
//in javascript object integer is assigned as it is but string is assigned is single ''
//widht:'500px' is string so it is assigned in string
// but top left bottom right is integer so thay assigned as integer - not in single '' 

export default FaceRecognition;