import React from 'react';

const Rank = ( {name,entries} ) => {

	return(

			<div>
				<div className='f2 white'>
					{name.toUpperCase()}
				</div>
				<div className='f3 white'>
					Your Current Rank is....
				</div>
				<div className='f2 white'>
					#{entries}
				</div>
			</div>
		);


}

export default Rank;