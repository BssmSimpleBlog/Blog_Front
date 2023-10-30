import React, { useEffect, useState } from 'react';
import '../style.scss';
import axios from 'axios';

const Comments = ( postId ) => {
  const [input, setInput] = useState('')
	const [comments, setComments] = useState([]);

  useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`https://port-0-simpleblog-euegqv2bln64bjco.sel5.cloudtype.app/comment/${postId}`
				);
				setComments(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	},[]);

	return (
		<div className='Comment_Container'>
			<div className='Comment_Inputs'>
				<input
					type='text'
					placeholder='댓글을 입력하세요...'
					className='Comment_Input'
				/>
				<button className='Comment_Button'>입력</button>
			</div>
		</div>
	);
};

export default Comments;
