class Material {
    constructor({ userId, title, description, photoUrl = null, materialType, location, qtyType, qty = 0.0 } = {}) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.photoUrl = photoUrl;
        this.materialType = materialType;
        this.location = location;
        this.qtyType = qtyType;
        this.qty = qty;
    }

    static fromJson(json) {
        return new Material({ ...json });
    }

    toJson() {
        return {
            userId: this.userId,
            title: this.title,
            description: this.description,
            photoUrl: this.photoUrl,
            materialType: this.materialType,
            location: this.location,
            qtyType: this.qtyType,
            qty: this.qty
        }
    }
}

export default Material;

