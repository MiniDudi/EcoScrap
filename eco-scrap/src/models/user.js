    class User {
    constructor({ id, name, email, createdAt, userType } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.userType = userType;
    }

    static fromJson(json) {
        return new User({ ...json });
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            userType: this.userType
        }
    }
}

export default User;