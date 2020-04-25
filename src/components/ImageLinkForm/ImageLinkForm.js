import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ( {onInputChange, onSubmit} ) => {

	return(

			<div>
				<p>This Magic Brain Will Detect Faces From Your Photos. Give It A Try!!</p>
				<div className='center'>
					<div className='form center pa4 br3 shadow-5'>
						<input onChange={onInputChange} type='text' className=' f4 pa2 center w-70'/>
						<button onClick={onSubmit} className=' w-30 grow f4 link ph3 pv2 dib white bg-light-purple'> Detect </button>
					</div>
					
				</div>
			</div>
		);


}

export default ImageLinkForm;