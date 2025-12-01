import React, { useEffect, useState } from 'react';
import api from '../../api';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './User.css';

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      Swal.fire('Error', 'Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: 'Delete User?',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/users/${userId}`);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        fetchUsers();
      } catch (err) {
        Swal.fire('Error!', err.response?.data?.message || 'Failed to delete user.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
      }

  return (
    <div className="container mt-5 user-container animate-fade-in">
      <h2 className="text-center mb-4 text-primary fw-bold">👥 User Management Panel</h2>
      <div className="table-responsive shadow rounded overflow-hidden">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="table-primary">
            <tr className="text-center">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td>{index + 1}</td>
                <td className="fw-semibold">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                    {user.role || 'user'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.isVerified ? 'bg-success' : 'bg-warning'}`}>
                    {user.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-danger btn-animated"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
