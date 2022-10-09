import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import MyModal from './modal';

function User({ user, modifyUser, deleteUser, allSelected, addCurrentId, removeCurrentId }) {
    const [show, setShow] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (allSelected) {
            setIsSelected(true);
            addCurrentId(user.id);
        }
        else {
            setIsSelected(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allSelected]);

    useEffect(() => {
        if(isSelected) {
            addCurrentId(user.id);
        }
        else {
            removeCurrentId(user.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelected]);

    return (
        <React.Fragment>
            <tr style={{
                backgroundColor: isSelected ? 'grey' : 'white',
                color: isSelected ? 'white' : 'black'
            }}>
                <td>
                    <input type='checkbox' checked={isSelected} onChange={
                        () => {
                            setIsSelected(curr => !curr);
                        }}
                    />
                </td>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.role}
                </td>
                <td>
                    <FaEdit variant="primary" onClick={handleShow} />
                    <AiFillDelete onClick={() => deleteUser(user.id)} />
                    <MyModal
                        show={show}
                        handleShow={handleShow}
                        handleClose={handleClose}
                        onClick={() => handleShow()}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                        id={user.id}
                        modifyUser={modifyUser}
                    />
                </td>
            </tr>
        </React.Fragment>
    );
}

export default User;
