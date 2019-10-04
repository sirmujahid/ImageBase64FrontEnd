import React from 'react';

const imageButton = (props) => {
    return(

      <button type="button" className="btn btn-outline-light m-2" onClick={() => props.chooseImageButton(props.imageName,props.baseString)}>
            {props.imageName}
      </button>
    )
}

export default imageButton;
