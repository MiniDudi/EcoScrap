class User {
    constructor({ id, name, email, createdAt } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    static fromJson(json) {
        return new User({ ...json });
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt
        }
    }
}

export default User;