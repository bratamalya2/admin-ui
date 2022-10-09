import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css';

function MyModal(props) {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modify User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='modal-form'>
                    <div>
                        <label>Username:</label>
                        <input type='text' placeholder={props.name} value={name} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type='text' placeholder={props.email} value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Role:</label>
                        <input type='text' placeholder={props.role} value={role} onChange={e => setRole(e.target.value)} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    // pass back changes to original state
                    props.handleClose();
                    props.modifyUser({
                        id: props.id,
                        newUser: {
                            name: name,
                            email: email,
                            role: role
                        }
                    });
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;
