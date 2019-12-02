var users = [
    { name: 'Devid', age: 40, uid: '1', rid: '1' },
    { name: 'Favian', age: 24, uid: '2', rid: '3' },
    { name: 'Hari', age: 36, uid: '3', rid: '2' },
    { name: 'Rob', age: 28, uid: '4', rid: '3' },
    { name: 'Mathew', age: 33, uid: '5', rid: '2' },
    { name: 'Cris', age: 32, uid: '6', rid: '3' },
];

var roles = [
    { name: 'Admin', description: 'Manage entire Application', id: '1' },
    { name: 'Content Approver', description: 'Manage content & its approval', id: '2' },
    { name: 'Content Creator ', description: 'Create all types of content', id: '3' }
];

module.exports = {users, roles};