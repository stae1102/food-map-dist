const { pool } = require("../../config/database");

exports.selectRestaurants = async function (connection, category) {
    const selectAllRestaurantsQuery = `SELECT * FROM FoodMap WHERE status = 'A';`;
    const selectCategorizedRestaurantQuery = `SELECT * FROM FoodMap WHERE category = ? and status = 'A';`;
    const Params = [category];

    const Query = category
        ? selectCategorizedRestaurantQuery
        : selectAllRestaurantsQuery;
    const rows = await connection.query(Query, Params);

    return rows;
};

exports.deleteStudent = async function (connection, studentIdx) {
    const Query = `UPDATE Students SET status = "D" WHERE studentIdx = ?;`;
    const Params = [studentIdx];

    const rows = await connection.query(Query, Params);

    return rows;
};

exports.updateStudent = async function (
    connection,
    studentIdx,
    studentName,
    major,
    birth,
    address
) {
    const Query = `UPDATE Students SET studentName=ifnull(?, studentName), major=ifnull(?, major), birth=ifnull(?, birth), address=ifnull(?, address) WHERE studentIdx = ?;`;
    const Params = [studentName, major, birth, address, studentIdx];

    const rows = await connection.query(Query, Params);

    return rows;
};

exports.isValidStudentIdx = async function (connection, studentIdx) {
    const Query = `SELECT * FROM Students WHERE studentIdx = ? and status = 'A';`;
    const Params = [studentIdx];

    const [rows] = await connection.query(Query, Params);

    if (rows < 1) {
        return false;
    } else {
        return true;
    }
    // return rows < 1 ? false : true;
};

exports.insertStudent = async function (
    connection,
    studentName,
    major,
    birth,
    address
) {
    const Query = `INSERT INTO Students(studentName, major, birth, address) VALUES (?,?,?,?);`;
    const Params = [studentName, major, birth, address];

    const rows = await connection.query(Query, Params);

    return rows;
};

exports.selectStudents = async function (connection, studentIdx) {
    const selectAllStudentQuery = `SELECT * FROM Students;`;
    const selectStudentByNameQuery = `SELECT * FROM Students WHERE studentIdx = ?;`;
    const Params = [studentIdx];

    const Query = studentName
        ? selectStudentByNameQuery
        : selectAllStudentQuery;

    // if (!studentName) {
    //     Query = selectAllStudentQuery;
    // } else {
    //     Query = selectStudentByNameQuery;
    // }

    const rows = await connection.query(Query, Params);

    return rows;
};

exports.exampleDao = async function (connection) {
    const Query = `SELECT * FROM Students;`;
    const Params = [];

    const rows = await connection.query(Query, Params);

    return rows;
};
