class Track {
    constructor(id, userId, name, status, dateUpload, file) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.status = status;
        this.dateUpload = dateUpload;
        this.file = file;
    }
}

module.exports = Track