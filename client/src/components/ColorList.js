import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';
// import {useParams} from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
// const {id} = useParams()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

// useEffect(() => {
//   axiosWithAuth()
//   .get('/api/colors/')
//   .then(res => {
//     setColorToEdit(res.data)
//   })
//   .catch(error => console.log(error))
// }, [id])

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res.data)
      updateColors([...colors.filter(item => item.id !== colorToEdit.id),
         res.data])
      // getColors()
      
    })
    .catch(error => console.log('error in put'))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`api/colors/${color.id}`, color)
    .then(res =>{
      updateColors(colors.filter(item => item.id !== color.id))
    })
    .catch(error => console.log('error in delete'))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li data-testid='colors' 
          key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
