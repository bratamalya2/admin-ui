import React from 'react';
import User from './user';
import '../styles/list.css';

function List({ users, modifyUser, deleteUser, currentPage, allSelected, setAllSelected, selectedIds, addCurrentId, removeCurrentId }) {
    return (
        <div className='list'>
            <table>
                <thead>
                    <tr>
                        <th><input type='checkbox' checked={allSelected} onChange={() => setAllSelected(curr => !curr)} /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, userIndex) => {
                            // userIndex -> 0 to n (0-9,10-19,...)
                            // currentPage -> 1 to N
                            if (userIndex < currentPage * 10 && userIndex >= (currentPage - 1) * 10) {
                                return (
                                    <User
                                        user={user}
                                        key={user.id}
                                        modifyUser={modifyUser}
                                        deleteUser={deleteUser}
                                        allSelected={allSelected}
                                        selectedIds={selectedIds}
                                        addCurrentId={addCurrentId}
                                        removeCurrentId={removeCurrentId}
                                    />
                                );
                            }
                            else {
                                return null;
                            }
                        }).filter(user => user !== null)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default List;