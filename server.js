const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ✅ CORS 설정 추가
app.use(cors({
    origin: "http://localhost:5500", // 프론트엔드 실행 주소 (VS Code Live Server)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json()); // ✅ JSON 요청을 받을 수 있도록 설정

// ✅ MySQL 데이터베이스 연결
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nohoyoung11*",
    database: "wikiDB"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL 연결 실패:", err);
    } else {
        console.log("✅ MySQL 연결 성공!");
    }
});

// ✅ 회원가입 API
app.post("/register", (req, res) => {
    const { nickname, email, password } = req.body;

    if (!nickname || !email || !password) {
        return res.status(400).json({ error: "모든 필드를 입력하세요." });
    }

    const sql = "INSERT INTO users (nickname, email, password) VALUES (?, ?, ?)";
    db.query(sql, [nickname, email, password], (err, result) => {
        if (err) {
            console.error("❌ 회원가입 오류:", err);
            return res.status(500).json({ error: "회원가입 실패" });
        }
        res.json({ success: true, nickname });
    });
});

// ✅ 서버 실행
app.listen(5000, () => {
    console.log("✅ 서버가 5000번 포트에서 실행 중!");
});